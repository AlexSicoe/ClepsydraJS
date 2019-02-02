import ProjectApi from "../requests/ProjectApi";
import { User, UserProject } from "./UserStore";
import { observable, action, computed } from "mobx";
import { AuthHeader } from "../requests/header-interfaces";
import { notifyError, notifySuccess } from "../../utils/notification-factories";
import { PROJECT, PROJECT_DELETED } from "../../utils/events";
import { MailOrNameBody } from './../requests/ProjectApi';
import socket from "../requests/socket";
import { PromiseState } from '../../utils/enums';
const { PENDING, DONE, ERROR } = PromiseState


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
  @observable state: PromiseState = PENDING
  @observable id: string = ''
  @observable name: string = ''
  @observable users: User[] = []
  @observable sprints: any[] = []
  @observable tasks: any[] = []


  constructor(projectApi: ProjectApi) {
    this.projectApi = projectApi
  }

  @action reset = () => {
    this.state = PENDING
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

  @action
  fetchProject = async (pid: string, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.projectApi.fetchProject(pid, header)

      this.state = DONE
      const project = response.data
      this.update(project)
      socket.on(PROJECT, (project: Project) => this.update(project))
      socket.on(PROJECT_DELETED, (project: Project) => this.reset())

    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  postProject = async (uid: string, body: ProjectBody, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.projectApi.postProject(uid, body, header)

      this.state = DONE
      notifySuccess(response)

    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  putProject = async (pid: string, body: ProjectBody, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.projectApi.putProject(pid, body, header)

      this.state = DONE
      notifySuccess(response)

    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  deleteProject = async (pid: string, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.projectApi.deleteProject(pid, header)

      this.state = DONE
      notifySuccess(response)

    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  addUserToProject = async (pid: string, body: MailOrNameBody, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.projectApi.addUserToProject(pid, body, header)

      this.state = DONE
      notifySuccess(response)

    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }

  @action
  removeUserFromProject = async (pid: string, uid: string, token: string) => {
    const header: AuthHeader = { token }
    try {
      this.state = PENDING
      const response = await this.projectApi.removeUserFromProject(pid, uid, header)

      this.state = DONE
      notifySuccess(response)

    } catch (error) {
      this.state = ERROR
      notifyError(error)
    }
  }
}