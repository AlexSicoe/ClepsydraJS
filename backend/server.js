const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('clepsydra', 'root', 'supersecret', {
  dialect: 'mysql',
  operatorsAliases: false,
  define: {
    timestamps: false,
    underscored: true
  }
})
exports.sequelize = sequelize
const Op = Sequelize.Op
const model = require('./model')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
var router = express.Router()

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


const errMsgUser = 'cannot find user'
const errMsgProject = 'cannot find project'
const errMsgUserProject = 'cannot find userProject'
const errMsgTask = 'cannot find task'
const errMsgSprint = 'cannot find sprint'
const errMsgStage = 'cannot find stage'


router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our wonderful REST API !!!' })
})

router.get('/create', async (req, res, next) => {
  try {
    const results = await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    console.table([...results])
    await sequelize.sync({ force: true })
    res.status(201).send('created tables')
  } catch (err) {
    next(err)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    await User.create(req.body)
    res.status(201).send('user registered successfully')
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  const whereDetailsMatch = {
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }
  try {
    let user = await User.findOne(whereDetailsMatch)
    if (!user) {
      res.status(401).send('mail and password do not match')
      throw new Error('mail and password do not match')
    }
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

router.get('/users', async (req, res, next) => {
  try {
    let users = await User.findAll()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uid, { include: [Project] })
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uid)
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    await user.update(req.body)
    res.status(200).send('updated user')
  } catch (err) {
    next(err)
  }
})



router.delete('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uid)
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    await user.destroy()
    res.status(200).send('removed user')
  } catch (err) {
    next(err)
  }
})

router.get('/users/:uid/projects', async (req, res, next) => {
  //get projects from a certain user
  try {
    let user = await User.findById(req.params.uid)
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    let projects = await user.getProjects() //TODO include role?
    res.status(200).json(projects)
  }
  catch (err) {
    next(err)
  }
})

router.post('/users/:uid/projects', async (req, res, next) => {
  //user makes a project
  let through = {
    role: 'Admin'
  }

  try {
    let user = await User.findById(req.params.uid)
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    let project = await Project.create(req.body)
    await user.addProject(project, { through })
    res.status(201).send('created project')
  }
  catch (err) {
    next(err)
  }
})

router.get('/projects', async (req, res, next) => {
  try {
    let projects = await Project.findAll()
    res.status(200).json(projects)
  } catch (err) {
    next(err)
  }
})

router.get('/projects/:pid', async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.pid, { include: [User] })
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    res.status(200).json(project)
  } catch (err) {
    next(err)
  }
})

router.put('/projects/:pid', async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.pid)
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    await project.update(req.body)

    res.status(200).send('updated project')
  } catch (err) {
    next(err)
  }
})

router.delete('/projects/:pid', async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.pid)
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    await project.destroy()
    res.status(200).send('removed project')
  } catch (err) {
    next(err)
  }
})

router.get('/projects/:pid/users', async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.pid)
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    let users = await project.getUsers()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/projects/:pid/users/:uid', async (req, res, next) => {
  //adds user to project
  const through = {
    role: 'User'
  }

  try {
    const findProject = Project.findById(req.params.pid)
    const findUser = User.findById(req.params.uid)
    const [project, user] = await Promise.all([findProject, findUser])
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    if (await project.hasUser(user)) {
      res.status(404).send('user already belongs to project')
      throw new Error('user already belongs to project')
    }
    await project.addUser(user, { through })
    res.status(200).send('added user to project')
  } catch (err) {
    next(err)
  }
})

router.put('/projects/:pid/users/:uid', async (req, res, next) => {
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
      res.status(404).send(errMsgUserProject)
      throw new Error(errMsgUserProject)
    }
    await through.update(req.body)
    res.status(200).send('userProject updated')
  } catch (err) {
    next(err)
  }
})

router.delete('/projects/:pid/users/:uid', async (req, res, next) => {
  //removes user from project
  try {
    const findProject = Project.findById(req.params.pid)
    const findUser = User.findById(req.params.uid)
    const [project, user] = await Promise.all([findProject, findUser])
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    if (!await project.hasUser(user))
      res.status(404).send('project doesn\'t have said user')
    await project.removeUser(user)
    res.status(200).send('user removed from project')
  } catch (err) {
    next(err)
  }
})

router.get('/projects/:pid/sprints', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.pid)
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    const sprints = await project.getSprints()
    res.status(200).json(sprints)
  } catch (err) {
    next(err)
  }
})

router.post('/projects/:pid/sprints', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.pid)
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    const sprint = await Sprint.create(req.body)
    await project.addSprint(sprint)
    res.status(201).send('sprint created')
  } catch (err) {
    next(err)
  }
})

router.put('/sprints/:sid', async (req, res, next) => {
  try {
    const sprint = await Sprint.findById(req.params.sid)
    if (!sprint) {
      res.status(404).send(errMsgSprint)
      throw new Error(errMsgSprint)
    }
    await sprint.update(req.body)
    res.status(200).send('sprint updated')
  } catch (err) {
    next(err)
  }
})

router.delete('/sprints/:sid', async (req, res, next) => {
  //TODO remove from project with all its stages, atomically
  try {
    const sprint = await Sprint.findById(req.params.sid)
    if (!sprint) {
      res.status(404).send(errMsgSprint)
      throw new Error(errMsgSprint)
    }
    await sprint.destroy()
    res.status(200).send('sprint removed')
  } catch (err) {
    next(err)
  }
})

router.get('/sprints/:sid/stages', async (req, res, next) => {
  const withOptions = {
    order: [
      ['position', 'ASC']
    ],
    include: [Task]
  }

  try {
    const sprint = await Sprint.findById(req.params.sid)
    if (!sprint) {
      res.status(404).send(errMsgSprint)
      throw new Error(errMsgSprint)
    }
    const stages = await sprint.getStages(withOptions)
    res.status(200).json(stages)
  } catch (err) {
    next(err)
  }
})

router.post('/sprints/:sid/stages', async (req, res, next) => {
  const options = {
    where: {
      sprint_id: req.params.sid
    }
  }

  try {
    const findSprint = Sprint.findById(req.params.sid)
    const findNr = Stage.max('position', options)
    let [sprint, nr] = await Promise.all([findSprint, findNr])
    if (!sprint) {
      res.status(404).send(errMsgSprint)
      throw new Error(errMsgSprint)
    }
    if (!nr)
      nr = 0

    req.body.position = ++nr
    const stage = await Stage.create(req.body)

    sprint.addStage(stage)
    res.status(200).send('stage created')
  } catch (err) {
    next(err)
  }
})

router.put('/stages/:stid', async (req, res, next) => {
  try {
    const stage = await Stage.findById(req.params.stid)
    if (!stage) {
      res.status(404).send(errMsgStage)
      throw new Error(errMsgStage)
    }
    await stage.update(req.body)
    res.status(200).send('updated stage')
  } catch (err) {
    next(err)
  }
})

router.delete('/stages/:stid', async (req, res, next) => {
  try {
    const stage = await Stage.findById(req.params.stid)
    if (!stage) {
      res.status(404).send(errMsgStage)
      throw new Error(errMsgStage)
    }
    stage.destroy()
    res.status(200).send('removed stage')
  } catch (err) {
    next(err)
  }
})

//TODO test and refactor
router.patch('/stages/:stid1/:stid2', async (req, res, next) => {
  //switch stages positions
  try {
    const findStage1 = Stage.findById(req.params.stid1)
    const findStage2 = Stage.findById(req.params.stid2)
    const [stage1, stage2] = await Promise.all([findStage1, findStage2])
    if (!(stage1 && stage2)) {
      res.status(404).send(errMsgStage)
      throw new Error(errMsgStage)
    }
    let pos1 = stage1.position
    let pos2 = stage2.position
      ;[pos1, pos2] = [pos2, pos1]
    const update1 = stage1.update({ position: pos1 })
    const update2 = stage2.update({ position: pos2 })
    await Promise.all([update1, update2])
    res.status(200).send('positions switched')
  } catch (err) {
    next(err)
  }
})

router.get('/projects/:pid/tasks', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.pid)
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    const tasks = await project.getTasks()
    res.status(200).json(tasks)
  } catch (err) {
    next(err)
  }
})

router.post('/projects/:pid/tasks', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.pid)
    if (!project) {
      res.status(404).send(errMsgProject)
      throw new Error(errMsgProject)
    }
    let task = await Task.create(req.body)
    await project.addTask(task)
    res.status(201).send('task created')
  } catch (err) {
    next(err)
  }
})


router.put('/tasks/:tid', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.tid)
    if (!task) {
      res.status(404).send(errMsgTask)
      throw new Error(errMsgTask)
    }

    await task.update(req.body)
    res.status(200).send('task updated')
  } catch (err) {
    next(err)
  }
})

router.delete('/tasks/:tid', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.tid)
    if (!task) {
      res.status(404).send(errMsgTask)
      throw new Error(errMsgTask)
    }
    await task.destroy()
    res.status(200).send('task removed')
  } catch (err) {
    next(err)
  }
})

router.post('/sprints/:sid/tasks/:tid', async (req, res, next) => {
  //add task to sprint
  const withOptions = {
    order: [
      ['position', 'ASC']
    ]
  }

  try {
    const findSprint = Sprint.findById(req.params.sid)
    const findTask = Task.findById(req.params.tid)
    const [sprint, task] = await Promise.all([findSprint, findTask])
    if (!sprint) {
      res.status(404).send(errMsgSprint)
      throw new Error(errMsgSprint)
    }
    if (!task) {
      res.status(404).send(errMsgTask)
      throw new Error(errMsgTask)
    }
    //if sprint doesn't have said task in any of its stages
    //add into initial stage
    const stages = await sprint.getStages(withOptions)
    for (let stage of stages) {
      if (await stage.hasTask(task)) {
        res.status(404).send('sprint already contains this task')
        throw new Error('sprint already contains this task')
      }
    }
    await stages[0].addTask(task)
    res.status(200).send('task added to sprint')
  } catch (err) {
    next(err)
  }
})

router.delete('/sprints/:sid/tasks/:tid', async (req, res, next) => {
  //if task belongs to a stage within this sprint, remove it
  try {
    const findSprint = Sprint.findById(req.params.sid)
    const findTask = Task.findById(req.params.tid)
    const [sprint, task] = await Promise.all([findSprint, findTask])
    if (!sprint) {
      res.status(404).send(errMsgSprint)
      throw new Error(errMsgSprint)
    }
    if (!task) {
      res.status(404).send(errMsgTask)
      throw new Error(errMsgTask)
    }
    const stages = await sprint.getStages()

    let flag = false
    for (let stage of stages) {
      if (await stage.hasTask(task)) {
        await stage.removeTask(task)
        res.status(200).send('task removed')
        flag = true
        break
      }
    }
    if (flag == false) {
      res.status(404).send(`${errMsgTask} in this sprint`)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/tasks/:tid/users/:uid', async (req, res, next) => {
  //assign task to user
  try {
    const findTask = Task.findById(req.params.tid)
    const findUser = User.findById(req.params.uid)
    const [task, user] = await Promise.all([findTask, findUser])
    if (!task) {
      res.status(404).send(errMsgTask)
      throw new Error(errMsgTask)
    }
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    await task.setUser(user)
    res.status(200).send('task assigned to user')
  } catch (err) {
    next(err)
  }

})

router.delete('/tasks/:tid/users/:uid', async (req, res, next) => {
  //unassign task from user
  try {
    const findTask = Task.findById(req.params.tid)
    const findUser = User.findById(req.params.uid)
    const [task, user] = await Promise.all([findTask, findUser])
    if (!task) {
      res.status(404).send(errMsgTask)
      throw new Error(errMsgTask)
    }
    if (!user) {
      res.status(404).send(errMsgUser)
      throw new Error(errMsgUser)
    }
    await task.setUser(null)
    res.status(200).send('task unassigned from user')
  } catch (err) {
    next(err)
  }
})

router.patch('/stages/:stid1/:stid2/tasks/:tid', async (req, res, next) => {
  //move task from one stage to another
  //TODO transaction
  try {
    const findStage1 = Stage.findById(req.params.stid1)
    const findStage2 = Stage.findById(req.params.stid2)
    const findTask = Task.findById(req.params.tid)
    const [stage1, stage2, task] = await Promise.all([
      findStage1, findStage2, findTask])
    if (!(stage1 && stage2)) {
      res.status(404).send(errMsgStage)
      throw new Error(errMsgStage)
    }
    if (!task) {
      res.status(404).send(errMsgTask)
      throw new Error(errMsgTask)
    }
    //YAGNI?
    if (!await stage1.hasTask(task)) {
      res.status(404).send('stage1 doesn\'t have task')
      throw new Error('stage1 doesn\'t have task')
    }
    const removeTask = stage1.removeTask(task)
    const addTask = stage2.addTask(task)
    await Promise.all([removeTask, addTask])
    res.status(200).send('task moved between stages')
  } catch (err) {
    next(err)
  }
})

router.patch('/sprints/:sid1/:sid2/tasks/:tid', async (req, res, next) => {
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
    const findSprint1 = Sprint.findById(req.params.sid1)
    const findSprint2 = Sprint.findById(req.params.sid2)
    const findTask = Task.findById(req.params.tid)
    const [sprint1, sprint2, task] = await Promise.all([
      findSprint1, findSprint2, findTask
    ])
    if (!(sprint1 && sprint2)) {
      res.status(404).send(errMsgSprint)
      throw new Error(errMsgSprint)
    }
    if (!task) {
      res.status(404).send(errMsgTask)
      throw new Error(errMsgTask)
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
      res.status(404).send(`${errMsgTask} in sprint1`)
      throw new Error(`${errMsgTask} in sprint1`)
    }

    //add to first stage in sprint2
    const stages2 = await sprint2.getStages(withOptions)
    await stages2[0].addTask(task)
    res.status(200).send('task moved between sprints')
  } catch (err) {
    next(err)
  }
})



/*
router.use((err, req, res, next) => {
  let message = err.status == 500 ? 'some error' : err.message
  console.warn(err, message)
  res.status(500).send('some error')
})
*/
app.use('/api', router)
app.listen(4000)

