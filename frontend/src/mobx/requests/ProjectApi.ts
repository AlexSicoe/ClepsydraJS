import { IAuthHeader } from './header-interfaces'
import { API } from '../../env-config'
import axios from 'axios'
import { IProject } from '../stores/model-interfaces'
import { ITask } from './../stores/model-interfaces'

export interface IMailOrNameBody {
  mailOrName: string
}

export default class ProjectApi {
  fetchProject = (pid: number, headers: IAuthHeader) =>
    axios.get(`${API}/projects/${pid}`, { headers })

  postProject = (uid: number, body: IProject, headers: IAuthHeader) =>
    axios.post(`${API}/users/${uid}/projects`, body, { headers })

  putProject = (pid: number, body: IProject, headers: IAuthHeader) =>
    axios.put(`${API}/projects/${pid}`, body, { headers })

  deleteProject = (pid: number, headers: IAuthHeader) =>
    axios.delete(`${API}/projects/${pid}`, { headers })

  addUser = (pid: number, body: IMailOrNameBody, headers: IAuthHeader) =>
    axios.post(`${API}/projects/${pid}/users`, body, { headers })

  removeUser = (pid: number, uid: number, headers: IAuthHeader) =>
    axios.delete(`${API}/projects/${pid}/users/${uid}`, { headers })

  addTask = (pid: number, body: ITask, headers: IAuthHeader) =>
    axios.post(`${API}/projects/${pid}/tasks`, body, { headers })
}
