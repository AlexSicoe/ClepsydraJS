import { ADMIN, AUTH } from '../../env-config'
import axios from 'axios'
import { ISignUpBody, ILoginBody } from '../stores/AuthStore'

export default class AuthApi {
  signUp = (body: ISignUpBody) => axios.post(`${ADMIN}/register`, body)

  login = (body: ILoginBody) => axios.post(`${AUTH}/login`, body)
}
