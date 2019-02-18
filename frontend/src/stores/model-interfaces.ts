export interface IUser {
  id: number
  name: string
  email: string
  projects: IProject[]
  tasks: ITask[]
  members: IMember[]
}

export interface IProject {
  id: number
  name: string
  users: IUser[]
  stages: IStage[]
  members: IMember[]
}

export enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}

export interface IMember {
  role: Role
  userId: number
  projectId: number
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
