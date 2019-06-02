// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const { STRING, INTEGER } = Sequelize.DataTypes

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient')
  const attributes = {
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 30]
      }
    },
    description: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 300]
      }
    },
    position: {
      type: INTEGER,
      validate: {
        min: 0
      }
    }
  }
  const options = {
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  }
  const Task = sequelizeClient.define('tasks', attributes, options)
  // console.dir(Task)

  Task.associate = (models) => {
    const { stages, users } = models
    Task.belongsTo(stages)
    Task.belongsTo(users)
  }

  return Task
}
