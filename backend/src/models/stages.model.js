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
  const Stage = sequelizeClient.define('stages', attributes, options)

  Stage.associate = (models) => {
    const { projects, tasks } = models
    Stage.belongsTo(projects)
    Stage.hasMany(tasks)
  }

  return Stage
}
