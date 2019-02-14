export interface IUser {
  id: number
  name: string
  email: string
  projects: IProject[]
  tasks: ITask[]
  member: IMember
}

export interface IProject {
  id: number
  name: string
  users: IUser[]
  stages: IStage[]
  member: IMember
}

export enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}

export interface IMember {
  role: Role
}

export interface IStage {
  id: number
  name: string
  position: number
  tasks: ITask[]
}

export interface ITask {
  id: number
  name: string
  description: string
  position: number
}
