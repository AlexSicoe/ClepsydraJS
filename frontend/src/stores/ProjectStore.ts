import { Application, Service } from '@feathersjs/feathers'
import { action, IObservableArray, observable, runInAction } from 'mobx'
import { PromiseState, SocketEvent } from '../util/enums'
import { safeSet } from '../util/functions'
import { notifyError, notifySuccess } from '../util/notification-factories'
import { IMember, IProject, IStage, ITask, IUser } from './model-interfaces'
import { ID } from '../util/types'
import { IKanbanAdapter } from '../components/view/kanban_adapters/KanbanAdapter'
const { PENDING, DONE, ERROR } = PromiseState
const { Created, Updated, Patched, Removed } = SocketEvent

export default class ProjectStore {
  @observable state: PromiseState = PENDING
  @observable id?: number
  @observable name: string = ''
  @observable users: IObservableArray<IUser> = observable([])
  @observable stages: IObservableArray<IStage> = observable([])
  private _adapter?: IKanbanAdapter

  set adapter(adapter: IKanbanAdapter) {
    this._adapter = adapter
  }

  get adapter() {
    if (this._adapter) return this._adapter
  }

  constructor(
    app: Application<any>,
    private projectService: Service<IProject>,
    private memberService: Service<IMember>,
    private userService: Service<IUser>,
    private stageService: Service<IStage>,
    private taskService: Service<ITask>,
    private swapTasksService: Service<any>,
    private swapStagesService: Service<any>
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

    taskService.on(Created, (task: ITask) => {
      console.log('Task created', task)
      if (this._adapter) {
        this._adapter.addTask(task)
      }

      const stage = this.stages.find((s) => s.id === task.stageId)
      if (!stage) return
      stage.tasks.push(task)
    })

    taskService.on(Updated, (task: ITask) => {
      console.log('Task updated', task)
      const stage = this.stages.find((s) => s.id === task.stageId)
      if (!stage) return

      if (this._adapter) {
        const oldTask = stage.tasks.find((t) => t.id === task.id)
        if (oldTask) {
          this._adapter.removeTask(oldTask)
          this._adapter.addTask(task)
        }
      }

      stage.tasks = stage.tasks.map((t) => (t.id === task.id ? task : t))
    })

    taskService.on(Patched, (task: ITask) => {
      console.log('Task patched', task)
      const stage = this.stages.find((s) => s.id === task.stageId)
      if (!stage) return

      if (this._adapter) {
        const oldTask = stage.tasks.find((t) => t.id === task.id)
        if (oldTask) {
          this._adapter.removeTask(oldTask)
          this._adapter.addTask(task)
        }
      }

      stage.tasks = stage.tasks.map((t) => (t.id === task.id ? task : t))
    })

    taskService.on(Removed, (task: ITask) => {
      console.log('Task removed', task)
      const stage = this.stages.find((s) => s.id === task.stageId)
      if (!stage) return

      if (this._adapter) {
        this._adapter.removeTask(task)
      }

      stage.tasks = stage.tasks.filter((t) => t.id !== task.id)
    })

    stageService.on(Created, (stage: IStage) => {
      console.log('Stage created', stage)
      this.stages.push(stage)
    })

    stageService.on(Updated, (stage: IStage) => {
      console.log('Stage updated', stage)

      this.stages = observable(
        this.stages.map((s) => (s.id === stage.id ? stage : s))
      )
    })

    stageService.on(Patched, (stage: IStage) => {
      console.log('Stage patched', stage)

      this.stages = observable(
        this.stages.map((s) => (s.id === stage.id ? stage : s))
      )
    })

    stageService.on(Removed, (stage: IStage) => {
      console.log('Stage removed', stage)

      this.stages = observable(this.stages.filter((s) => s.id !== stage.id))
    })
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
    this.name = ''
    this.users.clear()
    this.stages.clear()
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
    this.users = observable(this.users.filter((u) => u.id !== userId))
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

  addTask = async (stageId: ID, task: Partial<ITask>) => {
    const params = {
      query: { stageId }
    }

    try {
      this.state = PENDING
      delete task.id
      await this.taskService.create(task, params)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  updateTask = async (id: ID, task: ITask) => {
    try {
      this.state = PENDING
      await this.taskService.update(id, task)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  patchTask = async (id: ID, task: Partial<ITask>) => {
    try {
      this.state = PENDING
      await this.taskService.patch(id, task)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  removeTask = async (taskId: ID) => {
    try {
      this.state = PENDING
      await this.taskService.remove(taskId)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  swapTasks = async (sourceId: ID, targetId: ID) => {
    const params = {
      sourceId,
      targetId
    }

    try {
      this.state = PENDING
      await this.swapTasksService.patch(null, {}, params)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  addStage = async (stage: Partial<IStage>) => {
    const params = {
      query: { projectId: this.id }
    }

    try {
      this.state = PENDING
      await this.stageService.create(stage, params)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  swapStages = async (sourceId: ID, targetId: ID) => {
    const params = {
      sourceId,
      targetId
    }

    try {
      this.state = PENDING
      await this.swapStagesService.patch(null, {}, params)
      this.state = DONE
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }
}
