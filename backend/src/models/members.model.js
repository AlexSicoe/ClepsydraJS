// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const { STRING } = Sequelize.DataTypes

module.exports = (app) => {
  const sequelizeClient = app.get('sequelizeClient')
  const attributes = {
    role: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: {
          args: [['Admin', 'Moderator', 'User']],
          msg: 'Must be Admin, Moderator or User'
        }
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
  const Member = sequelizeClient.define('members', attributes, options)

  // eslint-disable-next-line no-unused-vars
  Member.associate = (models) => {
    const { users, projects } = models
    Member.belongsTo(users)
    Member.belongsTo(projects)
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  }

  return Member
}
