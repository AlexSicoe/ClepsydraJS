import ProjectApi from '../requests/ProjectApi'
import { observable, action, computed } from 'mobx'
import { IAuthHeader } from '../requests/header-interfaces'
import { notifyError, notifySuccess } from '../../utils/notification-factories'
import { PROJECT, PROJECT_DELETED } from '../../utils/events'
import { IMailOrNameBody } from './../requests/ProjectApi'
import socket from '../requests/socket'
import { PromiseState } from '../../utils/enums'
import { IProject, IUser, ISprint, ITask } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState

export default class ProjectStore {
  private api: ProjectApi
  @observable state: PromiseState = PENDING
  @observable id?: number
  @observable name?: string = ''
  @observable users?: IUser[] = []
  @observable sprints?: ISprint[] = []
  @observable tasks?: ITask[] = []

  constructor(api: ProjectApi) {
    this.api = api
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
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
  fetchProject = async (pid: number, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.fetchProject(pid, header)

      this.state = DONE
      const project = res.data
      this.update(project)
      socket.on(PROJECT, (resProject: IProject) => this.update(resProject))
      socket.on(PROJECT_DELETED, (resProject: IProject) => this.reset())
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  @action
  postProject = async (uid: number, body: IProject, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.postProject(uid, body, header)

      this.state = DONE
      notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  @action
  putProject = async (pid: number, body: IProject, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.putProject(pid, body, header)

      this.state = DONE
      notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  @action
  deleteProject = async (pid: number, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.deleteProject(pid, header)

      this.state = DONE
      notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  @action
  addUserToProject = async (
    pid: number,
    body: IMailOrNameBody,
    token: string
  ) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.addUser(pid, body, header)

      this.state = DONE
      notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  @action
  removeUserFromProject = async (pid: number, uid: number, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.removeUser(pid, uid, header)

      this.state = DONE
      notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }
}
