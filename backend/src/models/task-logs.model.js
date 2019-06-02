// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const { ENUM, INTEGER, DATE, NOW } = Sequelize.DataTypes

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient')
  const attributes = {
    type: {
      type: ENUM,
      values: ['ADD_TASK', 'REMOVE_TASK']
    },
    counter: {
      type: INTEGER,
      allowNull: false
    },
    date: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    }
  }
  const options = {
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  }
  const TaskLog = sequelizeClient.define('taskLogs', attributes, options)

  TaskLog.associate = (models) => {
    // console.log('MODELS')
    // console.log(Object.keys(models))

    const { projects } = models
    TaskLog.belongsTo(projects)

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  }

  return TaskLog
}
