import { Service } from '@feathersjs/feathers'
import { action, observable } from 'mobx'
import { PromiseState } from '../util/enums'
import { IMember, IProject, IStage, ITask, IUser } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState

export default class ProjectStore {
  @observable state: PromiseState = PENDING
  @observable id?: number
  @observable name: string = ''
  @observable users: IUser[] = []
  @observable stages: IStage[] = []
  @observable tasks: ITask[] = []

  constructor(
    private service: Service<IProject>,
    private memberService: Service<IMember>
  ) {
    // socket.on(PROJECT, (resProject: IProject) => this.update(resProject))
    // socket.on(PROJECT_DELETED, (resProject: IProject) => this.reset())
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
    this.name = ''
    this.users = []
    this.stages = []
    this.tasks = []
  }

  @action set = (project: IProject) => {
    this.id = project.id
    this.name = project.name
    this.users = project.users
    this.stages = project.stages
  }

  get = async (id: number) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      const project = await this.service.get(id)

      this.state = DONE
      this.set(project)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }

  create = async (project: Partial<IProject>) => {
    // const header: IAuthHeader = { accessToken }

    try {
      this.state = PENDING
      const res = await this.service.create(project)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }

  update = async (id: number, project: IProject) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      const res = await this.service.update(id, project)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }

  patch = async (id: number, project: Partial<IProject>) => {
    try {
      this.state = PENDING
      const res = await this.service.patch(id, project)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }

  remove = async (id: number) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      const res = await this.service.remove(id)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }

  addMember = async (pid: number, mailOrName: string) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      // const res =

      this.state = DONE
      // notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
    }
  }

  removeMember = async (pid: number, uid: number) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      // const res = await this.api.removeUser(pid, uid, header)

      this.state = DONE
      // notifySuccess(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
    }
  }
}
