import axios from 'axios'
import { IAuthHeader } from './header-interfaces'
import { API } from '../../env-config'
import { ISprint } from '../stores/model-interfaces'

export default class SprintApi {
  fetchSprint = (sid: number, headers: IAuthHeader) =>
    axios.get(`${API}/sprints/${sid}`, { headers })

  postSprint = (pid: number, body: ISprint, headers: IAuthHeader) =>
    axios.post(`${API}/projects/${pid}/sprints`, body, { headers })

  putSprint = (sid: number, body: ISprint, headers: IAuthHeader) =>
    axios.put(`${API}/sprints/${sid}`, body, { headers })

  deleteSprint = (sid: number, headers: IAuthHeader) =>
    axios.delete(`${API}/sprints/${sid}`, { headers })

  addTask = (sid: number, tid: number, headers: IAuthHeader) =>
    axios.post(`${API}/sprints/${sid}/tasks/${tid}`, { headers })

  removeTask = (sid: number, tid: number, headers: IAuthHeader) =>
    axios.delete(`${API}/sprints/${sid}/tasks/${tid}`, { headers })

  moveTask = (sid1: number, sid2: number, tid: number, headers: IAuthHeader) =>
    axios.patch(`${API}/sprints/${sid1}/${sid2}/moveTask/${tid}`, { headers })
}
