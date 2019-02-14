import { Service } from '@feathersjs/feathers'
import { action, observable } from 'mobx'
import { PromiseState } from '../util/enums'
import { notifyError } from '../util/notification-factories'
import { IUser } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState

export default class UserStore {
  @observable state: PromiseState = PENDING
  @observable id?: number
  @observable name: string = ''
  @observable email: string = ''
  @observable projects: any[] = []
  @observable tasks: any[] = []

  constructor(private service: Service<IUser>, private accessToken: string) {
    // socket.on(USER, (resUser: IUser) => {this.update(resUser)})
    // socket.on(USER_DELETED, () => this.reset())
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
    this.name = ''
    this.email = ''
    this.projects = []
    this.tasks = []
  }

  @action update = (user: IUser) => {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.projects = user.projects
    this.tasks = user.tasks
  }

  @action
  getMyUser = async () => {
    const PARAMS = {
      query: {
        $whoAmI: true
      }
    }
    try {
      this.state = PENDING
      const user = await this.service.find(PARAMS)

      this.state = DONE
      this.update(user as IUser)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  @action
  updateUser = async (id: number, user: IUser) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      const res = await this.service.update(id, user)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }

  @action
  patch = async (id: number, user: Partial<IUser>) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      const res = await this.service.patch(id, user)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }

  @action
  removeUser = async (id: number) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      const res = await this.service.remove(id)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }
}
