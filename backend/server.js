const _ = require('lodash')
const mysql = require('mysql2')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('clepsydra', 'root', '', {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
var router = express.Router()

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clepsydra'
})

connection.connect((err) => {
    if (!err) {
        console.log('Database is connected')
    } else {
        console.log('Error connecting database\n' + err)
    }
})


User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [3, 20]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [6, 30]
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
        underscored: true
    })



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
                res.status(200).send({
                    message: 'Login successful',
                    user: user
                })
            } else {
                res.status(401).send({
                    message: 'Email and password do not match'
                })
            }
        })
        .catch((error) => next(error))
})




app.use('/api', router)
app.listen(4000)


