import axios from 'axios'
import { IAuthHeader } from './header-interfaces'
import { API } from '../../env-config'
import { ITask } from './../stores/model-interfaces'

export default class TaskApi {
  putTask = (tid: number, body: ITask, headers: IAuthHeader) =>
    axios.put(`${API}/tasks/${tid}`, body, { headers })

  deleteTask = (tid: number, headers: IAuthHeader) =>
    axios.delete(`${API}/tasks/${tid}`, { headers })
}
