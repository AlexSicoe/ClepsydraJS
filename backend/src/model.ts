import Sequelize from 'sequelize'
import { sequelize } from './server'

export const User = sequelize.define('user', {
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
  token: Sequelize.STRING,
  expiry: Sequelize.DATE,
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
    defaultScope: {
      attributes: { exclude: ['password', 'token', 'expiry'] },
    },
    scopes: {
      withCredentials: {
        attributes: {},
      }
    }
  })

export const Project = sequelize.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    }
  }
})

export const UserProject = sequelize.define('userProject', {
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: {
        args: [['Admin', 'Moderator', 'User']],
        msg: 'Must be Admin, Moderator or User'
      }
    }
  }
  //TODO points??
})
export const Sprint = sequelize.define('sprint', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30]
    }
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    // validate: {isBefore: this.finishDate },

  },
  finishDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    // validate: {isAfter: this.startDate  }
  }
})
export const Stage = sequelize.define('stage', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    }
  },
  position: {
    type: Sequelize.INTEGER,
  }
})

export const Task = sequelize.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 30],
    }
  },
  isFinished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  timestamp: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }
})