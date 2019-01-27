import AuthApi from "../requests/AuthApi";
import { observable, action, computed, runInAction } from 'mobx'
import { Callback, PromiseState } from "../../utils/types";
import { notifyError, notifySuccess } from "../../utils/notification-factories";
import { handleSocketsOnLogin, handleSocketsOnLogout } from "../requests/socket";


export interface SignUpBody {
  username: string
  email: string
  password: string
}

export interface LoginBody {
  username: string
  password: string
}

export default class AuthStore {



  private authApi: AuthApi
  @observable state: PromiseState = 'pending'
  @observable token: string = ''
  @observable uid: string = ''

  constructor(authApi: AuthApi) {
    this.authApi = authApi

  }

  @action reset = () => {
    this.state = 'pending'
    this.token = ''
    this.uid = ''
  }

  @computed get isAuthenticated() {
    return !!this.token
  }

  @action
  signUp = async (body: SignUpBody) => {
    try {
      this.state = 'pending'
      const response = await this.authApi.signUp(body)

      this.state = 'done'
      notifySuccess(response)

    } catch (error) {
      this.state = 'error'
      notifyError(error)
    }
  }

  @action
  login = async (body: LoginBody, onSuccess: Callback) => {
    try {
      this.state = 'pending'
      const response = await this.authApi.login(body)

      this.state = 'done'
      runInAction(() => {
        const { token, uid } = response.data
        this.token = token
        this.uid = uid
      })
      onSuccess()
      handleSocketsOnLogin(this.uid)
      notifySuccess(response)
    } catch (error) {
      this.state = 'error'
      notifyError(error)
    }
  }

  @action
  logout = () => {
    handleSocketsOnLogout()
    this.reset()
    //TODO, reset the rest of the stores...
  }

}

