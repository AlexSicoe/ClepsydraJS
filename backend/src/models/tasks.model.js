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
      },
      async afterCreate(task, options) {
        let stage = await task.getStage()
        let project = await stage.getProject()
        let stages = await project.getStages()
        let taskCounters = await Promise.all(stages.map((s) => s.countTasks()))
        let counter = taskCounters.reduce((acc, cur) => acc + cur)

        await project.createTaskLog({
          type: 'ADD_TASK',
          counter
        })
      },
      async beforeDestroy(task, options) {
        let stage = await task.getStage()
        let project = await stage.getProject()
        let stages = await project.getStages()
        let taskCounters = await Promise.all(stages.map((s) => s.countTasks()))
        let counter = taskCounters.reduce((acc, cur) => acc + cur)
        counter--

        await project.createTaskLog({
          type: 'REMOVE_TASK',
          counter
        })
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
