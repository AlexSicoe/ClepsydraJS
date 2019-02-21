import { Service, Application } from '@feathersjs/feathers'
import { action, observable, IObservableArray } from 'mobx'
import { PromiseState, SocketEvent } from '../util/enums'
import { IMember, IProject, IStage, ITask, IUser } from './model-interfaces'
import { createObservableArray } from 'mobx/lib/internal'
import { safeSet } from '../util/functions'
import { notifyError, notifySuccess } from '../util/notification-factories'
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
    private memberService: Service<IMember>
  ) {
    app.on('logout', () => this.reset())

    projectService.on(Updated, (project) => {
      console.log('Updated project', project)
      if (project.id === this.id) {
        this.set(project)
      }
    })

    projectService.on(Patched, (project) => {
      console.log('Patched project', project)
      if (project.id === this.id) {
        this.set(project)
      }
    })

    projectService.on(Removed, (project) => {
      console.log('Removed project', project)
      if (project.id === this.id) {
        this.reset()
      }
    })

    memberService.on(Created, (member) => {
      console.log('Member added to project', member)
      // TODO
    })

    memberService.on(Removed, (member) => {
      console.log('Member removed from project', member)
      // TODO
    })

    memberService.on(Updated, (member) => {
      console.log('Member updated', member)
      // TODO
    })

    memberService.on(Patched, (member) => {
      console.log('Member patched', member)
      // TODO
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

  get = async (id: number) => {
    const params = {
      query: { $include: 'true' }
    }

    try {
      this.state = PENDING
      const project = await this.projectService.get(id, params)
      this.state = DONE
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

  addMember = async (
    projectId: number,
    mailOrName: string,
    member: Partial<IMember>
  ) => {
    const params = {
      query: {
        projectId
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

  removeMember = async (projectId: number, userId: number) => {
    const params = {
      query: {
        projectId,
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
}
