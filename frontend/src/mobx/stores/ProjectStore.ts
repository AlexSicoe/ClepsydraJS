import ProjectApi from '../requests/ProjectApi'
import { IUser, IUserProject } from './UserStore'
import { observable, action, computed } from 'mobx'
import { IAuthHeader } from '../requests/header-interfaces'
import { notifyError, notifySuccess } from '../../utils/notification-factories'
import { PROJECT, PROJECT_DELETED } from '../../utils/events'
import { IMailOrNameBody } from './../requests/ProjectApi'
import socket from '../requests/socket'
import { PromiseState } from '../../utils/enums'
const { PENDING, DONE, ERROR } = PromiseState

export interface IProjectBody {
  name: string
}

export interface IProject extends IProjectBody {
  id: string
  users: IUser[]
  sprints: any[]
  tasks: any[]
  userProject: IUserProject
}

export default class ProjectStore {
  private api: ProjectApi
  @observable state: PromiseState = PENDING
  @observable id: string = ''
  @observable name: string = ''
  @observable users: IUser[] = []
  @observable sprints: any[] = []
  @observable tasks: any[] = []

  constructor(api: ProjectApi) {
    this.api = api
  }

  @action reset = () => {
    this.state = PENDING
    this.id = ''
    this.name = ''
    this.users = []
    this.sprints = []
    this.tasks = []
  }

  @action update = (project: IProject) => {
    this.id = project.id
    this.name = project.name
    this.users = project.users
    this.sprints = project.sprints
    this.tasks = project.tasks
  }

  @action
  fetchProject = async (pid: string, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.fetchProject(pid, header)

      this.state = DONE
      const project = response.data
      this.update(project)
      socket.on(PROJECT, (receivedProject: IProject) =>
        this.update(receivedProject),
      )
      socket.on(PROJECT_DELETED, (receivedProject: IProject) => this.reset())
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  postProject = async (uid: string, body: IProjectBody, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.postProject(uid, body, header)

      this.state = DONE
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  putProject = async (pid: string, body: IProjectBody, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.putProject(pid, body, header)

      this.state = DONE
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  deleteProject = async (pid: string, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.deleteProject(pid, header)

      this.state = DONE
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  addUserToProject = async (
    pid: string,
    body: IMailOrNameBody,
    token: string,
  ) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.addUserToProject(pid, body, header)

      this.state = DONE
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  removeUserFromProject = async (pid: string, uid: string, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.removeUserFromProject(pid, uid, header)

      this.state = DONE
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }
}
