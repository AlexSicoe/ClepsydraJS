import axios from 'axios'
import { API } from '../../env-config'
import { IAuthHeader } from './header-interfaces'
import { IUserBody } from '../stores/UserStore'

export default class UserApi {
  fetchUser = (id: string, headers: IAuthHeader) =>
    axios.get(`${API}/users/${id}`, { headers })

  putUser = (id: string, body: IUserBody, headers: IAuthHeader) =>
    axios.put(`${API}/users/${id}`, body, { headers })

  deleteUser = (id: string, headers: IAuthHeader) =>
    axios.delete(`${API}/users/${id}`, { headers })
}
