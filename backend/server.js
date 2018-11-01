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

const { User, Project, UserProject, Sprint, Column, Task } = model
User.belongsToMany(Project, { through: UserProject })
// Project.belongsToMany(User, { through: UserProject })
Project.hasMany(Task)
// Task.hasOne(Project)
Project.hasMany(Sprint)
// Sprint.belongsTo(Project)
Sprint.hasMany(Column)
// Column.belongsTo(Sprint)
Column.hasMany(Task)
// Task.belongsTo(Column)
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
    if (!res.headersSent)
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
    res.status(201).send('created')
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
    if (!res.headersSent)
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

/*
router.use((err, req, res, next) => {
  let message = err.status == 500 ? 'some error' : err.message
  console.warn(err, message)
  res.status(500).send('some error')
})
*/
app.use('/api', router)
app.listen(4000)

