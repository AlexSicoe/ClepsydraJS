
import { observable, action, runInAction } from 'mobx';
import UserApi from '../requests/UserApi';
import { notifyError, notifySuccess } from '../../utils/notification-factories';
import { socket } from '../../actions/socket-actions';
import { USER, USER_DELETED } from '../../utils/events';
import { AuthHeader } from './../requests/header-interfaces';
import { Project } from './ProjectStore';

export interface UserBody {
  username: string
  email: string
}

export interface User extends UserBody {
  id: string
  projects: Project[]
  tasks: any[]
  timestamp: string
  userProject: any
}

export type Role = 'Admin' | 'Moderator' | 'User'

export interface UserProject {
  role: Role
}

export default class UserStore {

  private userApi: UserApi
  @observable id: string = ''
  @observable username: string = ''
  @observable email: string = ''
  @observable projects: any[] = []
  @observable tasks: any[] = []

  constructor(userApi: UserApi) {
    this.userApi = userApi
  }

  @action reset = () => {
    this.id = ''
    this.username = ''
    this.email = ''
    this.projects = []
    this.tasks = []
  }

  @action update = (user: User) => {
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.projects = user.projects
    this.tasks = user.tasks
  }

  fetchUser = async (id: string, header: AuthHeader) => {
    try {
      const response = await this.userApi.fetchUser(id, header)
      const user = response.data
      this.update(user)
      socket.on(USER, (user: User) => this.update(user))
      socket.on(USER_DELETED, () => this.reset())
    } catch (error) {
      notifyError(error)
    }
  }

  putUser = async (id: string, body: UserBody, header: AuthHeader) => {
    try {
      const response = await this.userApi.putUser(id, body, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  deleteUser = async (id: string, header: AuthHeader) => {
    try {
      const response = await this.userApi.deleteUser(id, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }



}