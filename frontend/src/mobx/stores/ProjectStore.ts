import ProjectApi from "../requests/ProjectApi";
import { User, UserProject } from "./UserStore";
import { observable, action } from "mobx";
import { AuthHeader } from "../requests/header-interfaces";
import { notifyError, notifySuccess } from "../../utils/notification-factories";
import { socket } from "../../actions/socket-actions";
import { PROJECT, PROJECT_DELETED } from "../../utils/events";
import { MailOrNameBody } from './../requests/ProjectApi';


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


  fetchProject = async (pid: string, header: AuthHeader) => {
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

  postProject = async (uid: string, body: ProjectBody, header: AuthHeader) => {
    try {
      const response = await this.projectApi.postProject(uid, body, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  putProject = async (pid: string, body: ProjectBody, header: AuthHeader) => {
    try {
      const response = await this.projectApi.putProject(pid, body, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  deleteProject = async (pid: string, header: AuthHeader) => {
    try {
      const response = await this.projectApi.deleteProject(pid, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  addUserToProject = async (pid: string, body: MailOrNameBody, header: AuthHeader) => {
    try {
      const response = await this.projectApi.addUserToProject(pid, body, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }

  removeUserFromProject = async (pid: string, uid: string, header: AuthHeader) => {
    try {
      const response = await this.projectApi.removeUserFromProject(pid, uid, header)
      notifySuccess(response)
    } catch (error) {
      notifyError(error)
    }
  }
}