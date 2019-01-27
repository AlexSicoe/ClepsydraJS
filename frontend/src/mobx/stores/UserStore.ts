
import { observable, action, computed, onBecomeObserved } from 'mobx';
import UserApi from '../requests/UserApi';
import { notifyError, notifySuccess } from '../../utils/notification-factories';
import { USER, USER_DELETED } from '../../utils/events';
import { AuthHeader } from './../requests/header-interfaces';
import { Project } from './ProjectStore';
import socket from '../requests/socket';
import { PromiseState } from '../../utils/types';

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
  @observable state: PromiseState = 'pending'
  @observable id: string = ''
  @observable username: string = ''
  @observable email: string = ''
  @observable projects: any[] = []
  @observable tasks: any[] = []

  constructor(userApi: UserApi) {
    this.userApi = userApi
    onBecomeObserved
  }

  @action reset = () => {
    this.state = 'pending'
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
  
  @action
  fetchUser = async (id: string, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = 'pending'
      const response = await this.userApi.fetchUser(id, header)

      this.state = 'done'
      const user = response.data
      this.update(user)
      socket.on(USER, (user: User) => {
        this.update(user)
        console.log('update!')
      })
      socket.on(USER_DELETED, () => this.reset())

    } catch (error) {
      this.state = 'error'
      notifyError(error)
    }
  }

  @action
  putUser = async (id: string, body: UserBody, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = 'pending'
      const response = await this.userApi.putUser(id, body, header)

      this.state = 'done'
      notifySuccess(response)

    } catch (error) {
      this.state = 'error'
      notifyError(error)
    }
  }

  @action
  deleteUser = async (id: string, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = 'pending'
      const response = await this.userApi.deleteUser(id, header)

      this.state = 'done'
      notifySuccess(response)

    } catch (error) {
      this.state = 'error'
      notifyError(error)
    }
  }



}