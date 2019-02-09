// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const { STRING } = Sequelize.DataTypes

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient')
  const attributes = {
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'username cannot be empty'
        },
        len: {
          args: [3, 30],
          msg: 'username must have between 3 and 30 characters'
        }
      }
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 30]
      }
    },
    googleId: { type: STRING },
    facebookId: { type: STRING }
  }
  const options = {
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  }
  const User = sequelizeClient.define('users', attributes, options)

  User.associate = (models) => {
    // console.log(Object.keys(models))
    const { projects, members, tasks } = models
    User.belongsToMany(projects, { through: members })
    User.hasMany(tasks)
  }

  return User
}
