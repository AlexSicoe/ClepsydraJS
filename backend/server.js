const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sequelize = require('sequelize')
const model = require('./model')


const sequelize = new Sequelize('clepsydra', 'root', 'supersecret', {
  dialect: 'mysql',
  define: {
    timestamps: false,
    underscored: true
  }
})
model.defineModels(sequelize)
const User = model.User
const Project = model.Project
const UserProject = model.UserProject
const KanbanBoard = model.KanbanBoard
const KanbanColumn = model.KanbanColumn
const Task = model.Task

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
var router = express.Router()


//test route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our REST API' })
})

/*
router.get('/create', (req, res, next) => {
  sequelize.sync({ force: true })
    .then(() => res.status(201).send('created tables'))
    .catch((err) => next({ err: err, status: 500 }))
})*/

router.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).send('created tables')
  } catch (err) {
    next({ err: err, status: 500 })
  }
})

router.post('/register', async (req, res, next) => {
  try {
    await User.create(req.body)
    res.status(201).send('user registered successfully')
  } catch (err) {
    next({ err: err, status: 500 })
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
    }
    res.status(200).send('successfully logged in').json(user)
  } catch (err) {
    next({ err: err.message, status: err.status })
  }
})

//=====================================



router.get('/users', async (req, res, next) => {
  try {
    let users = await User.findAll()
    res.status(200).json(users)
  } catch (err) {
    next({ err: err, status: 500 })
  }
})


router.get('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uid, { include: [Project] })
    if (!user) {
      res.status(404).send('user not found')
    }
    res.status(200).json(user)
  } catch (err) {
    next({ err: err.message, status: err.status })
  }
})

router.put('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uid)
    if (!user) {
      res.status(404).send('cannot find user')
    }
    await user.update(req.body)
    if (!res.headersSent) {
      res.status(201).send('updated user')
    }
  } catch (err) {
    next({ err: err, status: 500 })
  }
})

router.delete('/users/:uid', async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uid)
    if (!user) {
      res.status(404).send('cannot find user')
    }
    await user.destroy()
    res.status(201).send('removed user')
  } catch (err) {
    next({ err: err, status: 500 })
  }
})

router.get('/users/:uid/projects', (req, res, next) => {
  User.findById(req.params.uid)
    .then((user) => {
      if (user) {
        return user.getProjects()
      } else {
        res.status(404).send('cannot find user')
      }
    })
    .then((projects) => res.status(200).json(projects))
    .catch((err) => next({ err: err, status: 500 }))
})

router.post('/users/:uid/projects', (req, res, next) => {
  User.findById(req.params.uid)
    .then((user) => {
      if (user) {
        let project = req.body
        project.user_id = user.id //FIXME
        return Project.create(project)
      } else {
        res.status(404).send('cannot find user')
      }
    })
    .then((projects) => res.status(201).send('created'))
    .catch((err) => next(err))
})

//TODO test
router.get('/users/:uid/projects/:pid', (req, res, next) => {
  Project.findById(req.params.pid)
    .then((project) => {
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).send('project not found')
      }
    })
    .catch((err) => next(err))
})

//TODO test
router.put('/users/:uid/projects/:pid', (req, res, next) => {
  Project.findById(req.params.pid)
    .then((project) => {
      if (project) {
        return project.update(req.body)
      } else {
        res.status(404).send('project not found')
      }
    })
    .then(() => res.status(201).send('project updated'))
    .catch((err) => next(err))
})

//TODO test
router.delete('/users/:uid/projects/:pid', (req, res, next) => {
  Project.findById(req.params.id)
    .then((project) => {
      if (project) {
        return project.destroy()
      } else {
        res.status(404).send('project not found')
      }
    })
    .then(() => res.status(201).send('project removed'))
    .catch((err) => next(err))
})

router.get('/projects', (req, res, next) => {
  Project.findAll()
    .then((projects) => res.status(200).json(projects))
    .catch((err) => next({ err: err, status: 500 }))
})

//@deprecated. Use users/:uid/projects instead
router.post('/projects', (req, res, next) => {
  Project.create(req.body)
    .then(() => res.status(201).send('created project'))
    .catch((err) => next({ err: err, status: 500 }))
})

//TODO test
router.get('/projects/:pid', (req, res, next) => {
  Project.findById(req.params.pid, { include: [User] })
    .then((project) => {
      if (project) {
        res.status(200).json(project)
      } else {
        res.status(404).send('project not found')
      }
    })
    .catch((err) => next({ err: err.message, status: err.status }))
})

//TODO test
router.put('/projects/:pid', (req, res, next) => {
  Project.findById(req.params.pid)
    .then((project) => {
      if (project) {
        return project.update(req.body)
      } else {
        res.status(404).send('cannot find project')
      }
    })
    .then(() => {
      if (!res.headersSent) {
        res.status(201).send('updated project')
      }
    })
    .catch((err) => next({ err: err, status: 500 }))
})

//TODO test
router.delete('/projects/:pid', (req, res, next) => {
  Project.findById(req.params.pid)
    .then((project) => {
      if (project) {
        return project.destroy()
      } else {
        res.status(404).send('cannot find project')
      }
    })
    .then(() => res.status(201).send('removed project'))
    .catch((err) => next({ err: err, status: 500 }))
})

//TODO test
router.get('/projects/:pid/users', (req, res, next) => {
  Project.findById(req.params.pid)
    .then((project) => {
      if (project) {
        return project.getUsers()
      }
    })
    .then((users) => res.status(200).json(users))
    .catch((err) => next({ err: err, status: 500 }))
})

//TODO test
router.post('/projects/:pid/users/:uid', (req, res, next) => {
  //TODO add specific user to project
})

router.put('/projects/:pid/users/:uid', (req, res, next) => {
  //TODO edit specific user from project... 
  //think about UserProject roles too
})

router.delete('/projects/:pid/users/:uid', (req, res, next) => {
  //TODO remove specific user from project.. but don't delete him, obviously
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

