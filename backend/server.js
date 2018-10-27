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
router.get('/create', (req, res, next) => {
  sequelize.sync({ force: true })
    .then(() => res.status(201).send('created tables'))
    .catch((error) => next(error))
})

//route to handle user registration
router.post('/register', (req, res, next) => {
  User.create(req.body)
    .then(() => res.status(201).send('user registered successfully'))
    .catch((error) => next(error))
})

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then((user) => {
      if (user !== null) {
        // user.password = undefined //bassically, don't send the password
        res.status(200).send('success').json(user) //Login successful
      } else {
        res.status(401).send('mail and password do not match')
      }
    })
    .catch((err) => next({
      err: err.message, status: err.status //TODO test
    }))
})

//=====================================

router.get('/users', (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => next({ err: err, status: 500 }))
})

router.post('/users', (req, res, next) => {
  User.create(req.body)
    .then(() => res.status(201).send('created user'))
    .catch((err) => next({ err: err, status: 500 }))
})

router.get('/users/:uid', (req, res, next) => {
  User.findById(req.params.id, { include: [Project] }) //TODO see docs
    .then((user) => {
      if (user) {
        res.status(200).json(user)
      }
      else {
        res.status(404).send('user not found')
      }
    })
    .catch((err) => next({
      err: err.message, status: err.status
    }))
})

router.put('/users/:uid', (req, res, next) => {
  User.findById(req.params.uid)
    .then((user) => {
      if (user) {
        return user.update(req.body)
      } else {
        res.status(404).send('cannot find user')
      }
    })
    .then(() => {
      if (!res.headersSent) {
        res.status(201).send('updated user')
      }
    })
    .catch((err) => next({ err: err, status: 500 }))
})

router.delete('/users/:uid', (req, res, next) => {
  User.findById(req.param.uid)
    .then((user) => {
      if (user) {
        return user.destroy()
      } else {
        res.status(404).send('cannot find user')
      }
    })
    .then(() => res.statys(201).send('removed user'))
    .catch((err) => next({ err: err, status: 500 }))
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
        project.user_id = user.id
        return Project.create(project)
      } else {
        res.status(404).send('cannot find user')
      }
    })
    .then((projects) => res.status(201).send('created'))
    .catch((err) => next(err))
})

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

/*
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
*/

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

/*
router.use((err, req, res, next) => {
  let message = err.status == 500 ? 'some error' : err.message
  console.warn(err, message)
  res.status(500).send('some error')
})
*/
app.use('/api', router)
app.listen(4000)

