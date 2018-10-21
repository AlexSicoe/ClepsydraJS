const mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clepsydra'
})

connection.connect((err) => {
    if (!err) {
        console.log('Database is connected ... nn')
    } else {
        console.log('Error connecting database ... nn\n' + err)
    }
})

exports.register = (req, res) => {
    //console.log('req, req.body)
    var today = new Date()
    var users = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
        'password': req.body.password,
        'created': today,
        'modified': today
    }
    connection.query('INSERT INTO users SET ?', users, (error, results, fields) => {
        if (error) {
            console.log('error occurred', error)
            res.send({
                'code': 400,
                'failed': 'error occurred'
            })
        } else {
            console.log('The solution is:', results)
            res.send({
                'code': 200,
                'success': 'user registered successfully'
            })
        }
    })
}

exports.login = function (req, res) {
    var email = req.body.email
    var password = req.body.password
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
        if (error) {
            // console.log('error ocurred', error)
            res.send({
                'code': 400,
                'failed': 'error occurred'
            })
        } else {
            // console.log('The solution is:', results)
            if (results.length > 0) {
                if (results[0].password == password) { //TODO
                    res.send({
                        'code': 200,
                        'success': 'login successful'
                    })
                } else {
                    res.send({
                        'code': 204,
                        'success': 'Email and passwords does not match'
                    })
                }
            }
            else {
                res.send({
                    'code':204,
                    'success':'Email does not exist'
                })
            }
        }
    })
}