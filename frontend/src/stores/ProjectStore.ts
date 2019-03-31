import { Application, Service } from '@feathersjs/feathers'
import { action, IObservableArray, observable, runInAction } from 'mobx'
import { PromiseState, SocketEvent } from '../util/enums'
import { safeSet } from '../util/functions'
import { notifyError, notifySuccess } from '../util/notification-factories'
import { IMember, IProject, IStage, ITask, IUser } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState
const { Created, Updated, Patched, Removed } = SocketEvent

export default class ProjectStore {
  @observable state: PromiseState = PENDING
  @observable id?: number
  @observable name: string = ''
  @observable users: IObservableArray<IUser> = [] as any
  @observable stages: IObservableArray<IStage> = [] as any
  @observable tasks: IObservableArray<ITask> = [] as any

  constructor(
    app: Application<any>,
    private projectService: Service<IProject>,
    private memberService: Service<IMember>,
    private userService: Service<IUser>,
    private stageService: Service<IStage>
  ) {
    app.on('logout', () => this.reset())

    projectService.on(Updated, (project: IProject) => {
      console.log('Updated project', project)
      if (project.id === this.id) {
        this.set(project)
      }
    })

    projectService.on(Patched, (project: IProject) => {
      console.log('Patched project', project)
      if (project.id === this.id) {
        this.set(project)
      }
    })

    projectService.on(Removed, (project: IProject) => {
      console.log('Removed project', project)
      if (project.id === this.id) {
        this.reset()
      }
    })

    memberService.on(Created, async (member: IMember) => {
      console.log('Member added to project', member)
      await this.getUser(member)
    })

    memberService.on(Removed, (member: IMember) => {
      console.log('Member removed from project', member)
      this.deleteUser(member.userId)
    })

    memberService.on(Updated, async (member: IMember) => {
      console.log('Member updated', member)
      await this.getUser(member)
    })

    memberService.on(Patched, async (member: IMember) => {
      console.log('Member patched', member)
      await this.getUser(member)
    })
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
    this.name = ''
    this.users.clear()
    this.stages.clear()
    this.tasks.clear()
  }

  @action set = (project: IProject) => {
    this.id = project.id
    this.name = safeSet(this.name, project.name)
    this.users = safeSet(this.users, project.users)
    this.stages = safeSet(this.stages, project.stages)
  }

  @action upsertUser = (user: IUser) => {
    let foundUser = this.users.find((u) => u.id === user.id)
    if (foundUser) {
      foundUser = user
    } else {
      this.users.push(user)
    }
  }

  @action deleteUser = (userId: number) => {
    // @ts-ignore
    this.users = this.users.filter((u) => u.id !== userId)
  }

  getStages = async (stages: IStage[]) => {
    const params = {
      query: { $include: 'true' }
    }

    try {
      this.state = PENDING
      stages = await Promise.all(
        stages.map((s) => this.stageService.get(s.id, params))
      )
      this.state = DONE
      return stages
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  get = async (id: number) => {
    const params = {
      query: { $include: 'true' }
    }

    try {
      this.state = PENDING
      const project = await this.projectService.get(id, params)
      this.state = DONE
      project.stages = (await this.getStages(project.stages)) as IStage[]
      this.set(project)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  create = async (project: Partial<IProject>) => {
    try {
      this.state = PENDING
      const res = await this.projectService.create(project)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  update = async (id: number, project: IProject) => {
    try {
      this.state = PENDING
      const res = await this.projectService.update(id, project)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  patch = async (id: number, project: Partial<IProject>) => {
    try {
      this.state = PENDING
      const res = await this.projectService.patch(id, project)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  remove = async (id: number) => {
    try {
      this.state = PENDING
      const res = await this.projectService.remove(id)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  addMember = async (mailOrName: string, member: Partial<IMember>) => {
    const params = {
      query: {
        projectId: this.id,
        mailOrName
      }
    }
    try {
      this.state = PENDING
      const res = await this.memberService.create(member, params)
      this.state = DONE
      notifySuccess('Member added')
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  removeMember = async (userId: number) => {
    const params = {
      query: {
        projectId: this.id,
        userId
      }
    }

    try {
      this.state = PENDING
      const res = await this.memberService.remove(null, params)
      this.state = DONE
      notifySuccess('Member removed')
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  getUser = async (member: IMember) => {
    const params = {
      query: { $include: 'true' }
    }

    try {
      this.state = PENDING
      const user = await this.userService.get(member.userId, params)
      user.members = member // TODO make an adapter
      this.upsertUser(user)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }
}
