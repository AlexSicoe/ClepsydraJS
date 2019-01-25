import AuthApi from "../requests/AuthApi";
import { observable, action, computed, runInAction } from 'mobx'
import { Callback } from "../../utils/types";
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
  @observable token: string = ''
  @observable uid: string = ''

  constructor(authApi: AuthApi) {
    this.authApi = authApi

  }

  @action reset = () => {
    this.token = ''
    this.uid = ''
  }

  @computed get isAuthenticated() {
    return !!this.token
  }

  signUp = async (body: SignUpBody) => {
    try {
      const response = await this.authApi.signUp(body)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  login = async (body: LoginBody, onSuccess: Callback) => {
    try {
      const response = await this.authApi.login(body)
      runInAction(() => {
        const { token, uid } = response.data
        this.token = token
        this.uid = uid
      })
      onSuccess()
      handleSocketsOnLogin(this.uid)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  logout = () => {
    handleSocketsOnLogout()
    this.reset()
    //TODO, reset the rest of the stores...
  }

}

