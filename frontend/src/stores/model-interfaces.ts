export interface IUser {
  id: number
  name: string
  email: string
  projects: IProject[]
  tasks: ITask[]
  members?: IMember
}

export interface IProject {
  id: number
  name: string
  users: IUser[]
  stages: IStage[]
  members?: IMember
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
  projectId: number
  name: string
  position: number
  taskLimit: number
  tasks: ITask[]
}

export interface ITask {
  id: number
  stageId: number
  userId?: number
  name: string
  description: string
  position: number
}

export interface ITimestamp {
  updatedAt: string
  createdAt: string
}
