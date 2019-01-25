import ProjectApi from "../requests/ProjectApi";
import { User, UserProject } from "./UserStore";
import { observable, action, computed } from "mobx";
import { AuthHeader } from "../requests/header-interfaces";
import { notifyError, notifySuccess } from "../../utils/notification-factories";
import { PROJECT, PROJECT_DELETED } from "../../utils/events";
import { MailOrNameBody } from './../requests/ProjectApi';
import socket from "../requests/socket";


export interface ProjectBody {
  name: string
}

export interface Project extends ProjectBody {
  id: string
  users: User[]
  sprints: any[]
  tasks: any[]
  userProject: UserProject
}

export default class ProjectStore {
  private projectApi: ProjectApi
  @observable id: string = ''
  @observable name: string = ''
  @observable users: User[] = []
  @observable sprints: any[] = []
  @observable tasks: any[] = []


  constructor(projectApi: ProjectApi) {
    this.projectApi = projectApi
  }

  @action reset = () => {
    this.id = ''
    this.name = ''
    this.users = []
    this.sprints = []
    this.tasks = []
  }


  @action update = (project: Project) => {
    this.id = project.id
    this.name = project.name
    this.users = project.users
    this.sprints = project.sprints
    this.tasks = project.tasks
  }

  @computed get loaded() {
    return !!this.id
  }


  fetchProject = async (pid: string, token: string) => {
    const header: AuthHeader = { token }
    try {
      const response = await this.projectApi.fetchProject(pid, header)
      const project = response.data
      this.update(project)
      socket.on(PROJECT, (project: Project) => this.update(project))
      socket.on(PROJECT_DELETED, (project: Project) => this.reset())
    } catch (error) {
      notifyError(error)
    }
  }

  postProject = async (uid: string, body: ProjectBody, token: string) => {
    const header: AuthHeader = { token }
    try {
      const response = await this.projectApi.postProject(uid, body, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  putProject = async (pid: string, body: ProjectBody, token: string) => {
    const header: AuthHeader = { token }
    try {
      const response = await this.projectApi.putProject(pid, body, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  deleteProject = async (pid: string, token: string) => {
    const header: AuthHeader = { token }
    try {
      const response = await this.projectApi.deleteProject(pid, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  addUserToProject = async (pid: string, body: MailOrNameBody, token: string) => {
    const header: AuthHeader = { token }
    try {
      const response = await this.projectApi.addUserToProject(pid, body, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  removeUserFromProject = async (pid: string, uid: string, token: string) => {
    const header: AuthHeader = { token }
    try {
      const response = await this.projectApi.removeUserFromProject(pid, uid, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }
}