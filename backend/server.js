const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('clepsydra', 'root', 'supersecret', {
  dialect: 'mysql',
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
User.hasMany(Task, { as: 'assignedTask' })
const Assignee = Task.belongsTo(User, { as: 'assignee' })
User.hasMany(Task, { as: 'reportedTask' })
const Reporter = Task.belongsTo(User, { as: 'reporter' })



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
    if (!user)
      res.status(401).send('mail and password do not match')
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
    if (!user)
      res.status(404).send('user not found')
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uid)
    if (!user)
      res.status(404).send('cannot find user')
    await user.update(req.body)
    res.status(200).send('updated user')
  } catch (err) {
    next(err)
  }
})



router.delete('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uid)
    if (!user)
      res.status(404).send('cannot find user')
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
    if (!user)
      res.status(404).send('cannot find user')
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
    if (!user)
      res.status(404).send('cannot find user')
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
    if (!project)
      res.status(404).send('project not found')
    res.status(200).json(project)
  } catch (err) {
    next(err)
  }
})

router.put('/projects/:pid', async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.pid)
    if (!project)
      res.status(404).send('cannot find project')
    await project.update(req.body)

    res.status(200).send('updated project')
  } catch (err) {
    next(err)
  }
})

router.delete('/projects/:pid', async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.pid)
    if (!project)
      res.status(404).send('cannot find project')
    await project.destroy()
    res.status(200).send('removed project')
  } catch (err) {
    next(err)
  }
})

router.get('/projects/:pid/users', async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.pid)
    if (!project)
      res.status(404).send('cannot find project')
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
    if (!project)
      res.status(404).send('cannot find project')
    if (!user)
      res.status(404).send('cannot find user')
    if (await project.hasUser(user))
      res.status(404).send('user already belongs to project')
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
    if (!through)
      res.status(404).send('cannot find userProject')
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
    if (!project)
      res.status(404).send('cannot find project')
    if (!user)
      res.status(404).send('cannot find user')
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
    if (!project)
      res.status(404).send('cannot find project')
    const sprints = await project.getSprints()
    res.status(200).json(sprints)
  } catch (err) {
    next(err)
  }
})

router.post('/projects/:pid/sprints', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.pid)
    if (!project)
      res.status(404).send('cannot find project')
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
    if (!sprint)
      res.status(404).send('cannot find sprint')
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
    if (!sprint)
      res.status(404).send('cannot find sprint')
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
    ]
  }

  try {
    const sprint = await Sprint.findById(req.params.sid)
    if (!sprint)
      res.status(404).send('cannot find sprint')
    const stages = await Stage.findAll(withOptions)
    res.status(200).json(stages)
  } catch (err) {
    next(err)
  }
})

router.post('/sprints/:sid/stages', async (req, res, next) => {
  try {
    const sprint = await Sprint.findById(req.params.sid)
    if (!sprint)
      res.status(404).send('cannot find sprint')
    const stage = await Stage.create(req.body)
    let nr = await Stage.count()
    await stage.update({ position: nr++ })
    sprint.addStage(stage)
    res.status(200).send('stage created')
  } catch (err) {
    next(err)
  }
})

router.put('/stages/:stid', async (req, res, next) => {
  try {
    const stage = await Stage.findById(req.params.stid)
    if (!stage)
      res.status(404).send('cannot find stage')
    stage.update(req.body)
    res.status(200).send('updated stage')
  } catch (err) {
    next(err)
  }
})

router.delete('/stages/:stid', async (req, res, next) => {
  try {
    const stage = await Stage.findById(req.params.stid)
    if (!stage)
      res.status(404).send('cannot find stage')
    stage.destroy()
    res.status(200).send('removed stage')
  } catch (err) {
    next(err)
  }
})

//TODO test and refactor
router.patch('/stages/:stid1/:stid2', async (req, res, next) => {
  try {
    const findStage1 = Stage.findById(req.params.stid1)
    const findStage2 = Stage.findById(req.params.stid2)
    const [stage1, stage2] = await Promise.all([findStage1, findStage2])
    if (!stage1)
      res.status(404).send('cannot find stage1')
    if (!stage2)
      res.status(404).send('cannot find stage2')
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
    if (!project)
      res.status(404).send('cannot find project')
    const tasks = await project.getTasks()
    res.status(200).json(tasks)
  } catch (err) {
    next(err)
  }
})

router.post('/projects/:pid/tasks', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.pid)
    if (!project)
      res.status(404).send('cannot find project')
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
    if (!task)
      res.status(404).send('cannot find task')
    await task.update(req.body)
    res.status(200).send('task updated')
  } catch (err) {
    next(err)
  }
})

router.delete('/tasks/:tid', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.tid)
    if (!task)
      res.status(404).send('cannot find task')
    await task.destroy()
    res.status(200).send('task removed')
  } catch (err) {
    next(err)
  }
})

router.post('sprint/:sid/tasks/:tid', async (req, res, next) => {
  try {
    const findSprint = Sprint.findById(req.params.sid)
    const findTask = Task.findById(req.params.tid)
    const [sprint, task] = await Promise.all([findSprint, findTask])
    if (!sprint)
      res.status(404).send('cannot find sprint')
    if (!task)
      res.status(404).send('cannot find task')
    //TODO if sprint doesn't have said task in any of its stages
    //TODO add into initial stage
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

