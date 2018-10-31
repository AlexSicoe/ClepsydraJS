const Sequelize = require('sequelize')
const server = require('./server')
const sequelize = server.sequelize

const defineRelations = () => {
  User.belongsToMany(Project, { through: UserProject })
  Project.belongsToMany(User, { through: UserProject })
  Project.hasMany(Task)
  Project.hasOne(KanbanBoard)
  KanbanBoard.hasMany(KanbanColumn)
  KanbanColumn.hasMany(Task)
}

const User = sequelize.define('user', {
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


const Project = sequelize.define('project', {
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

const UserProject = sequelize.define('userProject', {
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

const KanbanBoard = sequelize.define('kanbanBoard', {
  //TODO
})

const KanbanColumn = sequelize.define('kanbanColumn', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    }
  }
})

const Task = sequelize.define('task', {
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

defineRelations()

exports.User = User
exports.Project = Project
exports.UserProject = UserProject
exports.KanbanBoard = KanbanBoard
exports.KanbanColumn = KanbanColumn
exports.Task = Task
