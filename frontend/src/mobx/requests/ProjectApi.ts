import { IAuthHeader } from './header-interfaces'
import { API } from '../../env-config'
import axios from 'axios'
import { IProjectBody } from '../stores/ProjectStore'

export interface IMailOrNameBody {
  mailOrName: string
}

export default class ProjectApi {
  fetchProject = (pid: string, headers: IAuthHeader) =>
    axios.get(`${API}/projects/${pid}`, { headers })

  postProject = (uid: string, body: IProjectBody, headers: IAuthHeader) =>
    axios.post(`${API}/users/${uid}/projects`, body, { headers })

  putProject = (pid: string, body: IProjectBody, headers: IAuthHeader) =>
    axios.put(`${API}/projects/${pid}`, body, { headers })

  deleteProject = (pid: string, headers: IAuthHeader) =>
    axios.delete(`${API}/projects/${pid}`, { headers })

  addUserToProject = (
    pid: string,
    body: IMailOrNameBody,
    headers: IAuthHeader,
  ) => axios.post(`${API}/projects/${pid}/users`, body, { headers })

  removeUserFromProject = (pid: string, uid: string, headers: IAuthHeader) =>
    axios.delete(`${API}/projects/${pid}/users/${uid}`, { headers })
}
