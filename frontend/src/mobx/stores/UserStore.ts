import { observable, action, computed, onBecomeObserved } from 'mobx'
import UserApi from '../requests/UserApi'
import { notifyError, notifySuccess } from '../../utils/notification-factories'
import { USER, USER_DELETED } from '../../utils/events'
import { IAuthHeader } from './../requests/header-interfaces'
import { IProject } from './ProjectStore'
import socket from '../requests/socket'
import { PromiseState } from '../../utils/enums'
const { PENDING, DONE, ERROR } = PromiseState

export interface IUserBody {
  username: string
  email: string
}

export interface IUser extends IUserBody {
  id: string
  projects: IProject[]
  tasks: any[]
  timestamp: string
  userProject: any
}

export enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

export interface IUserProject {
  role: Role
}

export default class UserStore {
  private api: UserApi
  @observable state: PromiseState = PENDING
  @observable id: string = ''
  @observable username: string = ''
  @observable email: string = ''
  @observable projects: any[] = []
  @observable tasks: any[] = []

  constructor(api: UserApi) {
    this.api = api
  }

  @action reset = () => {
    this.state = PENDING
    this.id = ''
    this.username = ''
    this.email = ''
    this.projects = []
    this.tasks = []
  }

  @action update = (user: IUser) => {
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.projects = user.projects
    this.tasks = user.tasks
  }

  @action
  fetchUser = async (id: string, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.fetchUser(id, header)

      this.state = DONE
      const user = response.data
      this.update(user)
      socket.on(USER, (receivedUser: IUser) => {
        this.update(receivedUser)
      })
      socket.on(USER_DELETED, () => this.reset())
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  putUser = async (id: string, body: IUserBody, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.putUser(id, body, header)

      this.state = DONE
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  deleteUser = async (id: string, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.api.deleteUser(id, header)

      this.state = DONE
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }
}
