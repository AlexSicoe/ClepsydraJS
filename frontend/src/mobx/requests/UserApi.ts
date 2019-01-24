import axios from 'axios'
import { API } from '../../env-config';
import { AuthHeader } from './header-interfaces';
import { UserBody } from '../stores/UserStore';




export default class UserApi {

  fetchUser = (id: string, headers: AuthHeader) =>
    axios.get(`${API}/users/${id}`, { headers })

  putUser = (id: string, body: UserBody , headers: AuthHeader) =>
    axios.put(`${API}/users/${id}`, body, { headers })

  deleteUser = (id: string, headers: AuthHeader) =>
    axios.delete(`${API}/users/${id}`, { headers })

}