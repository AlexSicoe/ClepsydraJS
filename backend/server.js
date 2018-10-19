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
const login = require('./routes/loginroutes')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

var router = express.Router()

//test route
router.get('/', (req, res) => {
    res.json({ message: 'welcome to our upload module apis' })
})

//route to handle user registration
router.post('/register', login.register)
router.post('/login', login.login)
app.use('/api', router)
app.listen(4000)


