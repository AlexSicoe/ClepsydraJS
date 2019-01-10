'use strict'
require('dotenv').config()
const http = require('http')
const socketIo = require('socket.io')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const crypto = require('crypto')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: false,
    underscored: true
  }
})
exports.sequelize = sequelize
const Op = Sequelize.Op

const model = require('./model')
const isMail = require('./util/isMail')



const PORT = 4000
const TOKEN_LIFETIME = 3600 //in seconds
const TOKEN_BYTES = 64

const ERR_MSG_USER = 'cannot find user'
const ERR_MSG_PROJECT = 'cannot find project'
const ERR_MSG_USER_PROJECT = 'cannot find userProject'
const ERR_MSG_TASK = 'cannot find task'
const ERR_MSG_SPRINT = 'cannot find sprint'
const ERR_MSG_STAGE = 'cannot find stage'



const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())




let adminRouter = express.Router()
let authRouter = express.Router()
let apiRouter = express.Router()
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/api', apiRouter)

const { User, Project, UserProject, Sprint, Stage, Task } = model
User.belongsToMany(Project, { through: UserProject })
Project.belongsToMany(User, { through: UserProject })
Project.hasMany(Task, { onDelete: 'cascade', hooks: true })
Task.belongsTo(Project)
Project.hasMany(Sprint, { onDelete: 'cascade', hooks: true })
Sprint.belongsTo(Project)
Sprint.hasMany(Stage, { onDelete: 'cascade', hooks: true })
Stage.belongsTo(Sprint)
Stage.hasMany(Task)
Task.belongsTo(Stage)
User.hasMany(Task)
Task.belongsTo(User)




const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req, res) => res.send('Hello World'))


let clientBook = new Map()


function addClient(client, uid, book) {
  let userClients = book.get(uid)
  if (userClients) {
    userClients.push(client)
  } else {
    book.set(uid, [client])
  }
  console.log('Client booked: ', client)
  console.log(book)
}

function deleteClient(client, book) {
  for (let [uid, userClients] of book.entries()) {
    for (let i = 0; i < userClients.length; i++) {
      if (userClients[i] === client) {
        if (userClients.length === 1)
          book.delete(uid)
        else
          userClients.splice(i, 1)
        console.log('Client disconnected: ', client)
        console.log(book)
        return
      }
    }
  }
}

function isOnline(uid, book) {
  //todo observable
  return !!book.get(uid)
}

function countUsersOnline(book) {
  return book.size
}
////////////

function toUser(uid, book) {
  return book.get(uid)
}

async function toProjectMembers(pid, book) {
  let project = await Project.findByPk(pid)
  let users = await project.getUsers()
  return users.map(u => toUser(u.id, book))
}

io.on('connection', (socket) => {
  console.log('Client connected: ' + socket.id)

  socket.on('storeClientInfo', uid =>
    addClient(socket.id, uid, clientBook)
  )

  socket.on('disconnect', () =>
    deleteClient(socket.id, clientBook)
  )

  socket.on('error', (error) => {
    console.log('received error from client:', socket.id)
    console.log(error)
  })

  socket.on('isOnline', (uid) => {
    socket.emit('isOnline', isOnline(uid, clientBook))
  })
})

server.listen(PORT)
console.warn(`server listening on port ${PORT}`)




apiRouter.use(async (req, res, next) => {
  let { token } = req.headers
  try {
    let user = await User.scope('withCredentials').findOne({ where: { token } })
    if (!user) {
      res.status(403).send({ message: 'invalid user' })
      return
    }
    const timeDiff = moment().diff(user.expiry, 'seconds')
    console.warn(`${timeDiff}seconds`)
    if (timeDiff >= 0) {
      res.status(403).send({ message: 'authentication expired' })
      return
    }
    next()
  } catch (err) {
    next(err)
  }
})


const refreshToken = (user) => {
  user.expiry = moment().add(TOKEN_LIFETIME, 'seconds')
  user.token = crypto.randomBytes(TOKEN_BYTES).toString('hex')
}


adminRouter.get('/create', async (req, res, next) => {
  try {
    const results = await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    console.table([...results])
    await sequelize.sync({ force: true })
    res.status(201).send({ message: 'created tables' })
  } catch (err) {
    next(err)
  }
})

adminRouter.post('/register', async (req, res, next) => {
  try {
    await User.create(req.body)
    res.status(201).send({ message: 'user registered successfully' })
  } catch (err) {
    next(err)
  }
})

authRouter.post('/login', async (req, res, next) => {
  const { username: mailOrName, password } = req.body
  const whereCredentialsMatch = isMail(mailOrName) ?
    { where: { email: mailOrName, password } } :
    { where: { username: mailOrName, password } }

  try {
    let user = await User.findOne(whereCredentialsMatch)
    if (!user) {
      res.status(401).send({ message: 'username or pasword don\'t match' })
      return
    }
    refreshToken(user)
    await user.save()
    res.status(200).send({
      message: 'you\'re in',
      token: user.token,
      uid: user.id
    })
  } catch (err) {
    next(err)
  }
})

apiRouter.get('/', (req, res) => {
  res.send({ message: 'Welcome to our wonderful REST API !!!' })
})

const emitUser = async (uid, notification, socketIds) => {
  try {
    let user = await User.findByPk(uid, { include: [Project, Task] })
    for (let s of socketIds) {
      io.to(s).emit('userFetched', user, notification)
    }
  } catch (err) {
    console.log('Error: ', err)
  }
}

apiRouter.get('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.uid, { include: [Project, Task] })
    if (!user) {
      res.status(404).send({ message: ERR_MSG_USER })
      return
    }
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

apiRouter.put('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.uid)
    if (!user) {
      res.status(404).send({ message: ERR_MSG_USER })
      return
    }
    await user.update(req.body)
    res.status(200).send({ message: 'updated user' })
  } catch (err) {
    next(err)
  }
})

apiRouter.delete('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.uid)
    if (!user) {
      res.status(404).send({ message: ERR_MSG_USER })
      return
    }
    await user.destroy()
    res.status(200).send({ message: 'removed user' })
  } catch (err) {
    next(err)
  }
})

apiRouter.post('/users/:uid/projects', async (req, res, next) => {
  //user makes a project
  let through = {
    role: 'Admin'
  }
  let { uid } = req.params
  try {
    let user = await User.findByPk(uid)
    if (!user) {
      res.status(404).send({ message: ERR_MSG_USER })
      return
    }
    let project = await Project.create(req.body)
    await user.addProject(project, { through })
    emitUser(user.id, null, toUser(user.id, clientBook))
    res.status(201).send({ message: 'created project' })
  }
  catch (err) {
    next(err)
  }
})

const emitProject = async (pid, socketIds) => {
  try {
    let project = await Project.findByPk(pid, { include: [User, Sprint, Task] })
    for (let s of socketIds) {
      io.to(s).emit('projectFetched', project)
    }
  } catch (err) {
    console.log('Error: ', err)
  }
}

apiRouter.get('/projects/:pid', async (req, res, next) => {
  try {
    const { pid } = req.params
    let project = await Project.findByPk(pid, { include: [User, Sprint, Task] })
    if (!project) {
      res.status(404).send({ message: ERR_MSG_PROJECT })
      return
    }
    res.status(200).json(project)
  } catch (err) {
    next(err)
  }
})

apiRouter.put('/projects/:pid', async (req, res, next) => {
  try {
    let project = await Project.findByPk(req.params.pid)
    if (!project) {
      res.status(404).send({ message: ERR_MSG_PROJECT })
      return
    }
    await project.update(req.body)

    res.status(200).send({ message: 'updated project' })
  } catch (err) {
    next(err)
  }
})

apiRouter.delete('/projects/:pid', async (req, res, next) => {
  try {
    let project = await Project.findByPk(req.params.pid)
    if (!project) {
      res.status(404).send({ message: ERR_MSG_PROJECT })
      return
    }
    await project.destroy()

    //TODO emitUser to all users who are part of this project
    res.status(200).send({ message: 'removed project' })
  } catch (err) {
    next(err)
  }
})

apiRouter.post('/projects/:pid/users', async (req, res, next) => {
  //adds user to project
  const through = {
    role: 'User'
  }

  const { pid } = req.params
  const { mailOrName } = req.body
  const mailOrNameMatch = isMail(mailOrName) ?
    { email: mailOrName } :
    { username: mailOrName }

  try {
    const findProject = Project.findByPk(pid)
    const findUser = User.findOne({ where: mailOrNameMatch })
    const [project, user] = await Promise.all([findProject, findUser])
    if (!project) {
      res.status(404).send({ message: ERR_MSG_PROJECT })
      return
    }
    if (!user) {
      res.status(404).send({ message: ERR_MSG_USER })
      return
    }
    if (await project.hasUser(user)) {
      res.status(404).send({ message: 'user already belongs to project' })
      return
    }
    await project.addUser(user, { through })

    //emitUser to whom was added
    let notification = {
      title: 'Invitation',
      body: `You've been invited into project: ${project.name}`,
      icon: 'info',
    }
    emitUser(user.id, notification, toUser(user.id, clientBook))

    //emitProject to members
    emitProject(project.id, await toProjectMembers(project.id, clientBook))

    res.status(200).send({ message: 'added user to project' })
  } catch (err) {
    next(err)
  }
})

apiRouter.put('/projects/:pid/users/:uid', async (req, res, next) => {
  //edits joint data of user and project... 
  //think about UserProject roles
  const whereDetailsMatch = {
    where: {
      project_id: req.params.pid,
      user_id: req.params.uid
    }
  }

  try {
    let through = await UserProject.findOne(whereDetailsMatch)
    if (!through) {
      res.status(404).send({ message: ERR_MSG_USER_PROJECT })
      return
    }
    await through.update(req.body)
    res.status(200).send({ message: 'userProject updated' })
  } catch (err) {
    next(err)
  }
})

apiRouter.delete('/projects/:pid/users/:uid', async (req, res, next) => {
  //removes user from project
  try {
    const findProject = Project.findByPk(req.params.pid)
    const findUser = User.findByPk(req.params.uid)
    const [project, user] = await Promise.all([findProject, findUser])
    if (!project) {
      res.status(404).send({ message: ERR_MSG_PROJECT })
      return
    }
    if (!user) {
      res.status(404).send({ message: ERR_MSG_USER })
      return
    }
    if (!await project.hasUser(user))
      res.status(404).send({ message: 'project doesn\'t have said user' })
    await project.removeUser(user)
    res.status(200).send({ message: 'user removed from project' })
  } catch (err) {
    next(err)
  }
})

apiRouter.get('/sprints/:sid', async (req, res, next) => {
  const StageWithOptions = {
    model: Stage,
    order: [['position', 'ASC']],
    include: [Task],
    separate: true
  }

  try {
    const { sid } = req.params
    const sprint = await Sprint.findByPk(sid, {
      include: [StageWithOptions]
    })
    if (!sprint) {
      res.status(404).send({ message: ERR_MSG_SPRINT })
      return
    }
    res.status(200).json(sprint)
  } catch (err) {
    next(err)
  }
})

apiRouter.post('/projects/:pid/sprints', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.pid)
    if (!project) {
      res.status(404).send({ message: ERR_MSG_PROJECT })
      return
    }
    const sprint = await Sprint.create(req.body)
    await project.addSprint(sprint)
    res.status(201).send({ message: 'sprint created' })
  } catch (err) {
    next(err)
  }
})

apiRouter.put('/sprints/:sid', async (req, res, next) => {
  try {
    const sprint = await Sprint.findByPk(req.params.sid)
    if (!sprint) {
      res.status(404).send({ message: ERR_MSG_SPRINT })
      return
    }
    await sprint.update(req.body)
    res.status(200).send({ message: 'sprint updated' })
  } catch (err) {
    next(err)
  }
})

apiRouter.delete('/sprints/:sid', async (req, res, next) => {
  //TODO remove from project with all its stages, atomically
  try {
    const sprint = await Sprint.findByPk(req.params.sid)
    if (!sprint) {
      res.status(404).send({ message: ERR_MSG_SPRINT })
      return
    }
    await sprint.destroy()
    res.status(200).send({ message: 'sprint removed' })
  } catch (err) {
    next(err)
  }
})

apiRouter.post('/sprints/:sid/stages', async (req, res, next) => {
  const options = {
    where: {
      sprint_id: req.params.sid
    }
  }

  try {
    const findSprint = Sprint.findByPk(req.params.sid)
    const findNr = Stage.max('position', options)
    let [sprint, nr] = await Promise.all([findSprint, findNr])
    if (!sprint) {
      res.status(404).send({ message: ERR_MSG_SPRINT })
      return
    }
    if (!nr)
      nr = 0

    req.body.position = ++nr
    const stage = await Stage.create(req.body)

    sprint.addStage(stage)
    res.status(200).send({ message: 'stage created' })
  } catch (err) {
    next(err)
  }
})

apiRouter.put('/stages/:stid', async (req, res, next) => {
  try {
    const stage = await Stage.findByPk(req.params.stid)
    if (!stage) {
      res.status(404).send({ message: ERR_MSG_STAGE })
      return
    }
    await stage.update(req.body)
    res.status(200).send({ message: 'updated stage' })
  } catch (err) {
    next(err)
  }
})

apiRouter.delete('/stages/:stid', async (req, res, next) => {
  try {
    const stage = await Stage.findByPk(req.params.stid)
    if (!stage) {
      res.status(404).send({ message: ERR_MSG_STAGE })
      return
    }
    stage.destroy()
    res.status(200).send({ message: 'removed stage' })
  } catch (err) {
    next(err)
  }
})

//TODO refactor
apiRouter.patch('/stages/:stid1/:stid2', async (req, res, next) => {
  //switch stages positions
  try {
    const findStage1 = Stage.findByPk(req.params.stid1)
    const findStage2 = Stage.findByPk(req.params.stid2)
    const [stage1, stage2] = await Promise.all([findStage1, findStage2])
    if (!(stage1 && stage2)) {
      res.status(404).send({ message: ERR_MSG_STAGE })
      return
    }
    let pos1 = stage1.position
    let pos2 = stage2.position
      ;[pos1, pos2] = [pos2, pos1]
    const update1 = stage1.update({ position: pos1 })
    const update2 = stage2.update({ position: pos2 })
    await Promise.all([update1, update2])
    res.status(200).send({ message: 'positions switched' })
  } catch (err) {
    next(err)
  }
})

apiRouter.post('/projects/:pid/tasks', async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.pid)
    if (!project) {
      res.status(404).send({ message: ERR_MSG_PROJECT })
      return
    }
    let task = await Task.create(req.body)
    await project.addTask(task)
    res.status(201).send({ message: 'task created' })
  } catch (err) {
    next(err)
  }
})


apiRouter.put('/tasks/:tid', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.tid)
    if (!task) {
      res.status(404).send({ message: ERR_MSG_TASK })
      return
    }

    await task.update(req.body)
    res.status(200).send({ message: 'task updated' })
  } catch (err) {
    next(err)
  }
})

apiRouter.delete('/tasks/:tid', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.tid)
    if (!task) {
      res.status(404).send({ message: ERR_MSG_TASK })
      return
    }
    await task.destroy()
    res.status(200).send({ message: 'task removed' })
  } catch (err) {
    next(err)
  }
})

apiRouter.post('/sprints/:sid/tasks/:tid', async (req, res, next) => {
  //add task to sprint
  const withOptions = {
    order: [
      ['position', 'ASC']
    ]
  }

  try {
    const findSprint = Sprint.findByPk(req.params.sid)
    const findTask = Task.findByPk(req.params.tid)
    const [sprint, task] = await Promise.all([findSprint, findTask])
    if (!sprint) {
      res.status(404).send({ message: ERR_MSG_SPRINT })
      return
    }
    if (!task) {
      res.status(404).send({ message: ERR_MSG_TASK })
      return
    }
    //if sprint doesn't have said task in any of its stages
    //add into initial stage
    const stages = await sprint.getStages(withOptions)
    for (let stage of stages) {
      if (await stage.hasTask(task)) {
        res.status(404).send({ message: 'sprint already contains this task' })
        return
      }
    }
    await stages[0].addTask(task)
    res.status(200).send({ message: 'task added to sprint' })
  } catch (err) {
    next(err)
  }
})

apiRouter.delete('/sprints/:sid/tasks/:tid', async (req, res, next) => {
  //if task belongs to a stage within this sprint, remove it
  try {
    const findSprint = Sprint.findByPk(req.params.sid)
    const findTask = Task.findByPk(req.params.tid)
    const [sprint, task] = await Promise.all([findSprint, findTask])
    if (!sprint) {
      res.status(404).send({ message: ERR_MSG_SPRINT })
      return
    }
    if (!task) {
      res.status(404).send({ message: ERR_MSG_TASK })
      return
    }
    const stages = await sprint.getStages()

    let flag = false
    for (let stage of stages) {
      if (await stage.hasTask(task)) {
        await stage.removeTask(task)
        res.status(200).send({ message: 'task removed' })
        flag = true
        break
      }
    }
    if (flag == false) {
      res.status(404).send({ message: `${ERR_MSG_TASK} in this sprint` })
    }
  } catch (err) {
    next(err)
  }
})

apiRouter.post('/tasks/:tid/users/:uid', async (req, res, next) => {
  //assign task to user
  try {
    const findTask = Task.findByPk(req.params.tid)
    const findUser = User.findByPk(req.params.uid)
    const [task, user] = await Promise.all([findTask, findUser])
    if (!task) {
      res.status(404).send({ message: ERR_MSG_TASK })
      return
    }
    if (!user) {
      res.status(404).send({ message: ERR_MSG_USER })
      return
    }
    await task.setUser(user)
    res.status(200).send({ message: 'task assigned to user' })
  } catch (err) {
    next(err)
  }

})

apiRouter.delete('/tasks/:tid/users/:uid', async (req, res, next) => {
  //unassign task from user
  try {
    const findTask = Task.findByPk(req.params.tid)
    const findUser = User.findByPk(req.params.uid)
    const [task, user] = await Promise.all([findTask, findUser])
    if (!task) {
      res.status(404).send({ message: ERR_MSG_TASK })
      return
    }
    if (!user) {
      res.status(404).send({ message: ERR_MSG_USER })
      return
    }
    await task.setUser(null)
    res.status(200).send({ message: 'task unassigned from user' })
  } catch (err) {
    next(err)
  }
})

apiRouter.patch('/stages/:stid1/:stid2/tasks/:tid', async (req, res, next) => {
  //move task from one stage to another
  //TODO transaction
  try {
    const findStage1 = Stage.findByPk(req.params.stid1)
    const findStage2 = Stage.findByPk(req.params.stid2)
    const findTask = Task.findByPk(req.params.tid)
    const [stage1, stage2, task] = await Promise.all([
      findStage1, findStage2, findTask])
    if (!(stage1 && stage2)) {
      res.status(404).send({ message: ERR_MSG_STAGE })
      return
    }
    if (!task) {
      res.status(404).send({ message: ERR_MSG_TASK })
      return
    }
    //YAGNI?
    if (!await stage1.hasTask(task)) {
      res.status(404).send({ message: 'stage1 doesn\'t have task' })
      return
    }
    const removeTask = stage1.removeTask(task)
    const addTask = stage2.addTask(task)
    await Promise.all([removeTask, addTask])
    res.status(200).send({ message: 'task moved between stages' })
  } catch (err) {
    next(err)
  }
})

apiRouter.patch('/sprints/:sid1/:sid2/tasks/:tid', async (req, res, next) => {
  //move task from one sprint to another
  //adds task to first stage of 2nd sprint
  //TODO transaction
  //TODO maybe use '/sprints/:sid/tasks/:tid' request called from here
  const withOptions = {
    order: [
      ['position', 'ASC']
    ]
  }

  try {
    const findSprint1 = Sprint.findByPk(req.params.sid1)
    const findSprint2 = Sprint.findByPk(req.params.sid2)
    const findTask = Task.findByPk(req.params.tid)
    const [sprint1, sprint2, task] = await Promise.all([
      findSprint1, findSprint2, findTask
    ])
    if (!(sprint1 && sprint2)) {
      res.status(404).send({ message: ERR_MSG_SPRINT })
      return
    }
    if (!task) {
      res.status(404).send({ message: ERR_MSG_TASK })
      return
    }
    //find and remove task in sprint1
    let flag = false
    const stages1 = await sprint1.getStages()
    for (let stage of stages1) {
      if (await stage.hasTask(task)) {
        await stage.removeTask(task)
        flag = true
        break
      }
    }
    if (flag == false) {
      res.status(404).send({ message: `${ERR_MSG_TASK} in sprint1` })
      return
    }

    //add to first stage in sprint2
    const stages2 = await sprint2.getStages(withOptions)
    await stages2[0].addTask(task)
    res.status(200).send({ message: 'task moved between sprints' })
  } catch (err) {
    next(err)
  }
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let message = err.status == 500 ? 'some error' : err.message
  console.warn(err, message)
  res.status(500).send({ message: 'some error' })
})