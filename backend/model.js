const Sequelize = require('sequelize')
const server = require('./server')
const sequelize = server.sequelize

exports.User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'username cannot be empty'
      },
      len: {
        args: [3, 30],
        msg: 'username must have between 3 and 30 characters'
      }
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 30],
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: {},
      }
    }
  })

exports.Project = sequelize.define('project', {
  name: {
    type: Sequelize.STRING,
    // unique: true
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    }
  }
})
exports.UserProject = sequelize.define('userProject', {
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
      isIn: {
        args: [['Admin', 'Moderator', 'User']],
        msg: 'Must be Admin, Moderator or User'
      }
    }
  }
  //TODO points??
})
exports.KanbanBoard = sequelize.define('kanbanBoard', {
  //TODO
})
exports.KanbanColumn = sequelize.define('kanbanColumn', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    }
  }
})
exports.Task = sequelize.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    }
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }
})