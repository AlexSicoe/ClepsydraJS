import Sequelize, {
  DataTypeAbstract,
  DefineAttributeColumnOptions
} from 'sequelize'
const { INTEGER, STRING, BOOLEAN, DATE, NOW } = Sequelize
declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions
  }
}
interface UserAttributes {
  id?: string
  username: string
  password: string
  email: string
  token: string
  expiry: string
  timestamp: string
}
export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes
export type UserModel = Sequelize.Model<UserInstance, UserAttributes>

export function initUser(sequelize: Sequelize.Sequelize): UserModel {
  const attributes: SequelizeAttributes<UserAttributes> = {
    username: {
      type: STRING,
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
      }
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 30]
      }
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    token: STRING,
    expiry: DATE,
    timestamp: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    }
  }
  const options: Sequelize.DefineOptions<UserInstance> = {
    defaultScope: {
      attributes: { exclude: ['password', 'token', 'expiry'] }
    },
    scopes: {
      withCredentials: {
        attributes: {}
      }
    }
  }
  const User = sequelize.define<UserInstance, UserAttributes>(
    'user',
    attributes,
    options
  )
  return User
}

interface ProjectAttributes {
  id?: string
  name: string
}
export type ProjectInstance = Sequelize.Instance<ProjectAttributes> &
  ProjectAttributes
export type ProjectModel = Sequelize.Model<ProjectInstance, ProjectAttributes>
export function initProject(sequelize: Sequelize.Sequelize): ProjectModel {
  const attributes: SequelizeAttributes<ProjectAttributes> = {
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 30]
      }
    }
  }
  const Project = sequelize.define<ProjectInstance, ProjectAttributes>(
    'project',
    attributes
  )
  return Project
}

interface UserProjectAttributes {
  id?: string
  role: 'Admin' | 'Moderator' | 'User'
}
export type UserProjectInstance = Sequelize.Instance<UserProjectAttributes> &
  UserProjectAttributes
export type UserProjectModel = Sequelize.Model<
  UserProjectAttributes,
  UserProjectAttributes
>
export function initUserProject(
  sequelize: Sequelize.Sequelize
): UserProjectModel {
  const attributes: SequelizeAttributes<UserProjectAttributes> = {
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
  const UserProject = sequelize.define<
    UserProjectInstance,
    UserProjectAttributes
  >('userProject', attributes)
  return UserProject
}

interface SprintAttributes {
  id?: string
  name: string
  startDate: string
  finishDate: string
}
export type SprintInstance = Sequelize.Instance<SprintAttributes> &
  SprintAttributes
export type SprintModel = Sequelize.Model<SprintInstance, SprintAttributes>
export function initSprint(sequelize: Sequelize.Sequelize): SprintModel {
  const attributes: SequelizeAttributes<SprintAttributes> = {
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 30]
      }
    },
    startDate: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
      // validate: {isBefore: this.finishDate },
    },
    finishDate: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
      // validate: {isAfter: this.startDate  }
    }
  }
  const Sprint = sequelize.define<SprintInstance, SprintAttributes>(
    'sprint',
    attributes
  )
  return Sprint
}

interface StageAttributes {
  id?: string
  name: string
  position: number
}
export type StageInstance = Sequelize.Instance<StageAttributes> &
  StageAttributes
export type StageModel = Sequelize.Model<StageInstance, StageAttributes>
export function initStage(sequelize: Sequelize.Sequelize): StageModel {
  const attributes: SequelizeAttributes<StageAttributes> = {
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 30]
      }
    },
    position: {
      type: INTEGER
    }
  }
  const Stage = sequelize.define<StageInstance, StageAttributes>(
    'stage',
    attributes
  )
  return Stage
}

interface TaskAttributes {
  id?: string
  name: string
  description: string
  position: number
  isFinished: boolean
  timestamp: string
}
export type TaskInstance = Sequelize.Instance<TaskAttributes> & TaskAttributes
export type TaskModel = Sequelize.Model<TaskInstance, TaskAttributes>
export function initTask(sequelize: Sequelize.Sequelize): TaskModel {
  const attributes: SequelizeAttributes<TaskAttributes> = {
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
      type: INTEGER
    },
    isFinished: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    timestamp: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    }
  }
  const Task = sequelize.define<TaskInstance, TaskAttributes>(
    'task',
    attributes
  )
  return Task
}
