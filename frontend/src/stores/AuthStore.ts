import { Service, Application } from '@feathersjs/feathers'
import { action, computed, observable } from 'mobx'
import { PromiseState } from '../util/enums'
import { Callback } from '../util/types'
import { IUser } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState

export default class AuthStore {
  @observable state: PromiseState = PENDING
  @observable accessToken: string = ''

  constructor(
    private app: Application<any>,
    private userService: Service<IUser>
  ) {}

  @action reset = () => {
    this.state = PENDING
    this.accessToken = ''
  }

  @action set = (accessToken: string) => {
    this.accessToken = accessToken
  }

  @computed get isAuthenticated() {
    return !!this.accessToken
  }

  signUp = async (user: Partial<IUser>) => {
    try {
      this.state = PENDING
      const res = await this.userService.create(user)

      this.state = DONE
      console.log(res)
      // notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      console.log(err)
      // notifyError(err)
    }
  }

  login = async (user: Partial<IUser>, onSuccess: Callback) => {
    const data = { ...user, strategy: 'local' }

    try {
      this.state = PENDING
      // const res = await this.authService.create(data)
      await this.app.authenticate(data)
      this.state = DONE
      // this.update(res.accessToken)
      onSuccess()
      // console.log(res)
      // notifySuccess(response)
    } catch (err) {
      this.state = ERROR
      console.log(err)
      // TODO redirect to login
      // notifyError(err)
    }
  }

  @action
  logout = () => {
    this.reset()
    // TODO, reset the rest of the stores...
  }
}
