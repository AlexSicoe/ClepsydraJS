import { Application, Service } from '@feathersjs/feathers'
import { action, observable } from 'mobx'
import { PromiseState } from '../util/enums'
import { notifyError, notifySuccess } from '../util/notification-factories'
import { Callback } from '../util/types'
import { IUser } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState

export default class AuthStore {
  @observable state: PromiseState = PENDING

  constructor(
    private app: Application<any>,
    private userService: Service<IUser>
  ) {}

  @action reset = () => {
    this.state = PENDING
  }

  signUp = async (user: Partial<IUser>) => {
    try {
      this.state = PENDING
      const res = await this.userService.create(user)

      this.state = DONE
      console.log(res)
      notifySuccess('Registered')
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  login = async (
    user: Partial<IUser>,
    onSuccess: Callback,
    onError: Callback
  ) => {
    const data = { ...user, strategy: 'local' }

    try {
      this.state = PENDING
      await this.app.authenticate(data)

      this.state = DONE
      onSuccess()
    } catch (err) {
      this.state = ERROR
      onError()
      notifyError(err)
    }
  }

  @action
  logout = async (onSuccess: Callback) => {
    try {
      this.state = PENDING
      await this.app.logout()

      this.state = DONE
      onSuccess()
      this.reset()
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }
}
