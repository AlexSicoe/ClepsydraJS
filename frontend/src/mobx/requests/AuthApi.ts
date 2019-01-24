import { ADMIN, AUTH } from "../../env-config";
import axios from 'axios'
import { SignUpBody, LoginBody } from "../stores/AuthStore";

export default class AuthApi {

  signUp = (body: SignUpBody) =>
    axios.post(`${ADMIN}/register`, body)

  login = (body: LoginBody) =>
    axios.post(`${AUTH}/login`, body)


}