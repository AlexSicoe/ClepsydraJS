const _ = require('lodash')
const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sequelize = require('sequelize')
const model = require('./model')


const sequelize = new Sequelize('clepsydra', 'root', 'supersecret', {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const User = model.defineUser(sequelize)


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
        .then(() => res.status(201).send('created'))
        .catch((error) => next(error))
})

//route to handle user registration
router.post('/register', (req, res, next) => {
    User.create(req.body)
        .then(() => res.status(201).send('User registered successfully'))
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
                res.status(200).send(user) //Login successful
            } else {
                res.status(401).send() // Email and password do not match
            }
        })
        .catch((error) => next(error))
})




app.use('/api', router)
app.listen(4000)

