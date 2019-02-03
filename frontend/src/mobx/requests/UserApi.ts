import axios from 'axios'
import { API } from '../../env-config'
import { IAuthHeader } from './header-interfaces'
import { IUser } from '../stores/model-interfaces'

export default class UserApi {
  fetchUser = (id: number, headers: IAuthHeader) =>
    axios.get(`${API}/users/${id}`, { headers })

  putUser = (id: number, body: IUser, headers: IAuthHeader) =>
    axios.put(`${API}/users/${id}`, body, { headers })

  deleteUser = (id: number, headers: IAuthHeader) =>
    axios.delete(`${API}/users/${id}`, { headers })

  assignTask = (uid: number, tid: number, headers: IAuthHeader) =>
    axios.post(`${API}/users/${uid}/tasks/${tid} `, { headers })

  unassignTask = (uid: number, tid: number, headers: IAuthHeader) =>
    axios.delete(`${API}/users/${uid}/tasks/${tid} `, { headers })
}
