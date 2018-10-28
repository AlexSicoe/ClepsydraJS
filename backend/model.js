const Sequelize = require('sequelize')


exports.defineModels = (sequelize) => {
  const User = defineUser(sequelize)
  const Project = defineProject(sequelize)
  const UserProject = defineUserProject(sequelize)
  const KanbanBoard = defineKanbanBoard(sequelize)
  const KanbanColumn = defineKanbanColumn(sequelize)
  const Task = defineTask(sequelize)


  User.belongsToMany(Project, { through: UserProject })
  Project.belongsToMany(User, { through: UserProject })
  Project.hasMany(Task)
  Project.hasOne(KanbanBoard)
  KanbanBoard.hasMany(KanbanColumn)
  KanbanColumn.hasMany(Task)


  exports.User = User
  exports.Project = Project
  exports.UserProject = UserProject
  exports.KanbanBoard = KanbanBoard
  exports.KanbanColumn = KanbanColumn
  exports.Task = Task
}

const defineUser = (sequelize) =>
  sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 30],
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
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


const defineProject = (sequelize) =>
  sequelize.define('project', {
    name: {
      type: Sequelize.STRING,
      // unique: true
      validate: {
        len: [2, 30],
        notEmpty: true,
      },
    },
  })

const defineUserProject = (sequelize) =>
  sequelize.define('userProject', {
    role: {
      type: Sequelize.STRING,
      validate: {
        len: [2, 30],
        notEmpty: true,
        isIn: {
          args: [['Admin', 'Moderator', 'User']],
          msg: 'Must be Admin, Moderator or User'
        }
      },
    }
    //TODO points??
  })

const defineKanbanBoard = (sequelize) =>
  sequelize.define('kanbanBoard', {
    //TODO
  })

const defineKanbanColumn = (sequelize) =>
  sequelize.define('kanbanColumn', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      }
    }
  })

const defineTask = (sequelize) =>
  sequelize.define('task', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      }
    },
    timestamp: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  })

