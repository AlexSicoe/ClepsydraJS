import { action, observable } from 'mobx'
import { PromiseState } from '../../utils/enums'
import { USER, USER_DELETED } from '../../utils/events'
import { notifyError, notifySuccess } from '../../utils/notification-factories'
import socket from '../requests/socket'
import UserApi from '../requests/UserApi'
import { IAuthHeader } from './../requests/header-interfaces'
import { IUser } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState

export default class UserStore {
  private api: UserApi
  @observable state: PromiseState = PENDING
  @observable id?: number
  @observable username?: string = ''
  @observable email?: string = ''
  @observable projects?: any[] = []
  @observable tasks?: any[] = []

  constructor(api: UserApi) {
    this.api = api
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
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
  fetchUser = async (id: number, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.fetchUser(id, header)

      this.state = DONE
      const user = res.data
      this.update(user)
      socket.on(USER, (resUser: IUser) => {
        this.update(resUser)
      })
      socket.on(USER_DELETED, () => this.reset())
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  @action
  putUser = async (id: number, body: IUser, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.putUser(id, body, header)

      this.state = DONE
      notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  @action
  deleteUser = async (id: number, token: string) => {
    const header: IAuthHeader = { token }
    try {
      this.state = PENDING
      const res = await this.api.deleteUser(id, header)

      this.state = DONE
      notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }
}
