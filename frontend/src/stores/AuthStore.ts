import { Service } from '@feathersjs/feathers'
import { action, computed, observable, runInAction } from 'mobx'
import { PromiseState } from '../util/enums'
import { Callback } from '../util/types'
import { IUser } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState

export default class AuthStore {
  @observable state: PromiseState = PENDING
  @observable accessToken: string = ''

  constructor(
    private userService: Service<IUser>,
    private authService: Service<any>
  ) {}

  @action reset = () => {
    this.state = PENDING
    this.accessToken = ''
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
    try {
      this.state = PENDING
      const res = await this.authService.create(user)

      this.state = DONE
      runInAction(() => {
        const { token } = res.data
        this.accessToken = token
      })
      onSuccess()
      console.log(res)
      // notifySuccess(response)
    } catch (err) {
      this.state = ERROR
      console.log(err)
      // notifyError(err)
    }
  }

  @action
  logout = () => {
    this.reset()
    // TODO, reset the rest of the stores...
  }
}
