import AuthApi from '../requests/AuthApi'
import { observable, action, computed, runInAction } from 'mobx'
import { Callback } from '../../utils/types'
import { notifyError, notifySuccess } from '../../utils/notification-factories'
import { handleSocketsOnLogin, handleSocketsOnLogout } from '../requests/socket'
import { PromiseState } from '../../utils/enums'
const { PENDING, DONE, ERROR } = PromiseState

export interface ISignUpBody {
  username: string
  email: string
  password: string
}

export interface ILoginBody {
  username: string
  password: string
}

export default class AuthStore {
  private api: AuthApi
  @observable state: PromiseState = PENDING
  @observable token: string = ''
  @observable uid: string = ''

  constructor(api: AuthApi) {
    this.api = api
  }

  @action reset = () => {
    this.state = PENDING
    this.token = ''
    this.uid = ''
  }

  @computed get isAuthenticated() {
    return !!this.token
  }

  @action
  signUp = async (body: ISignUpBody) => {
    try {
      this.state = PENDING
      const response = await this.api.signUp(body)

      this.state = DONE
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  login = async (body: ILoginBody, onSuccess: Callback) => {
    try {
      this.state = PENDING
      const response = await this.api.login(body)

      this.state = DONE
      runInAction(() => {
        const { token, uid } = response.data
        this.token = token
        this.uid = uid
      })
      onSuccess()
      handleSocketsOnLogin(this.uid)
      notifySuccess(response)
    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  logout = () => {
    handleSocketsOnLogout()
    this.reset()
    // TODO, reset the rest of the stores...
  }
}
