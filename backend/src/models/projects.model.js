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
      validate: {
        notEmpty: true,
        len: [2, 30]
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
  const Project = sequelizeClient.define('projects', attributes, options)

  Project.associate = (models) => {
    const delOptions = { onDelete: 'cascade', hooks: true }
    const { users, members, stages } = models
    Project.belongsToMany(users, { through: members })
    Project.hasMany(stages, delOptions)
  }

  return Project
}
