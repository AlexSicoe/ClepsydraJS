import { AuthHeader } from "./header-interfaces"
import { API } from "../../env-config"
import axios from 'axios'
import { ProjectBody } from "../stores/ProjectStore";


export interface MailOrNameBody {
  mailOrName: string
}

export default class ProjectApi {

  fetchProject = (pid: string, headers: AuthHeader) =>
    axios.get(`${API}/projects/${pid}`, { headers })

  postProject = (uid: string, body: ProjectBody, headers: AuthHeader) =>
    axios.post(`${API}/users/${uid}/projects`, body, { headers })

  putProject = (pid: string, body: ProjectBody, headers: AuthHeader) =>
    axios.put(`${API}/projects/${pid}`, body, { headers })

  deleteProject = (pid: string, headers: AuthHeader) =>
    axios.delete(`${API}/projects/${pid}`, { headers })

  addUserToProject = (pid: string, body: MailOrNameBody, headers: AuthHeader) =>
    axios.post(`${API}/projects/${pid}/users`, body, { headers })

  removeUserFromProject = (pid: string, uid: string, headers: AuthHeader) =>
    axios.delete(`${API}/projects/${pid}/users/${uid}`, { headers })

}