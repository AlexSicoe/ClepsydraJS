export interface IUser {
  id?: number
  username?: string
  email?: string
  projects?: IProject[]
  tasks?: ITask[]
  timestamp?: string
  userProject?: IUserProject
}

export interface IProject {
  id?: number
  name?: string
  users?: IUser[]
  sprints?: ISprint[]
  tasks?: ITask[]
  userProject?: IUserProject
}

export enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}

export interface IUserProject {
  role?: Role
}

export interface ISprint {
  id?: number
  name?: string
  startDate?: string
  finishDate?: string
  stages?: IStage[]
}

export interface IStage {
  id?: number
  name?: string
  position?: number
  tasks?: ITask[]
}

export interface ITask {
  id?: number
  name?: string
  description?: string
  position: number
  isFinished?: boolean
  timestamp?: string
}
