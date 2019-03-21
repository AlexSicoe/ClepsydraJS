import { Application, Service } from '@feathersjs/feathers'
import { action, IObservableArray, observable } from 'mobx'
import { PromiseState, SocketEvent } from '../util/enums'
import { safeSet } from '../util/functions'
import { notifyError } from '../util/notification-factories'
import HyperArray from './../util/HyperArray'
import { IMember, IProject, ITask, IUser } from './model-interfaces'
const { PENDING, DONE, ERROR } = PromiseState
const { Created, Updated, Patched, Removed } = SocketEvent

export default class UserStore {
  @observable state: PromiseState = PENDING
  @observable id?: number
  @observable name: string = ''
  @observable email: string = ''
  @observable projects: IObservableArray<IProject> = [] as any
  @observable tasks: IObservableArray<ITask> = [] as any

  constructor(
    app: Application<any>,
    private userService: Service<IUser>,
    private projectService: Service<IProject>,
    private memberService: Service<IMember>,
    private taskService: Service<ITask>,
    private userTaskService: Service<ITask>
  ) {
    app.on('logout', () => this.reset())

    userService.on(Updated, (user) => {
      console.log('Updated user', user)
      if (user.id === this.id) {
        this.set(user)
      }
    })

    userService.on(Patched, (user) => {
      console.log('Patched user', user)
      if (user.id === this.id) {
        this.set(user)
      }
    })

    userService.on(Removed, (user) => {
      console.log('Deleted user', user)
      if (user.id === this.id) {
        this.reset()
      }
    })

    projectService.on(Created, (project: IProject) => {
      console.log('Added project', project)
      /**
       *  @todo Setup channels on server, and get rid of these guard checks
       */
      if (project.users.find((u) => u.id === this.id)) {
        this.projects.push(project)
      }
    })

    projectService.on(Updated, (project: IProject) => {
      console.log('Updated project', project)
      if (project.users.find((u) => u.id === this.id)) {
        new HyperArray(this.projects).set(project)
      }
    })

    projectService.on(Patched, (project: IProject) => {
      console.log('Patched project', project)
      if (project.users.find((u) => u.id === this.id)) {
        new HyperArray(this.projects).set(project)
      }
    })

    projectService.on(Removed, (project: IProject) => {
      console.log('Removed project', project)
      if (project.users.find((u) => u.id === this.id)) {
        new HyperArray(this.projects).remove(project)
      }
    })

    memberService.on(Created, (member: IMember) => {
      console.log('Member added to project', member)
      // TODO
    })

    memberService.on(Removed, (member: IMember) => {
      console.log('Member removed from project', member)
      // TODO
    })

    memberService.on(Updated, (member: IMember) => {
      console.log('Member updated', member)
      // TODO
    })

    memberService.on(Patched, (member: IMember) => {
      console.log('Member patched', member)
      // TODO
    })

    userTaskService.on(Created, (task: ITask) => {
      console.log('Task assigned to User', task)
      this.tasks.push(task)
    })

    userTaskService.on(Removed, (task: ITask) => {
      console.log('Task unassigned from User', task)
      new HyperArray(this.tasks).remove(task)
    })

    taskService.on(Removed, (task: ITask) => {
      console.log('Task removed', task)
      new HyperArray(this.tasks).remove(task)
    })

    taskService.on(Patched, (task: ITask) => {
      console.log('Task patched', task)
      new HyperArray(this.tasks).set(task)
    })

    taskService.on(Updated, (task: ITask) => {
      console.log('Task updated', task)
      new HyperArray(this.tasks).set(task)
    })
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
    this.name = ''
    this.email = ''
    this.projects.clear()
    this.tasks.clear()
  }

  @action set = (user: Partial<IUser>) => {
    this.id = user.id

    this.name = safeSet(this.name, user.name)
    this.email = safeSet(this.email, user.email)
    this.projects = safeSet(this.projects, user.projects)
    this.tasks = safeSet(this.tasks, user.tasks)
  }

  get = async () => {
    const params = {
      query: {
        $whoAmI: 'true'
      }
    }
    try {
      this.state = PENDING
      const user = await this.userService.find(params)
      this.state = DONE
      this.set(user as IUser)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  update = async (id: number, user: IUser) => {
    try {
      this.state = PENDING
      const res = await this.userService.update(id, user)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  patch = async (id: number, user: Partial<IUser>) => {
    try {
      this.state = PENDING
      const res = await this.userService.patch(id, user)

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
      const res = await this.userService.remove(id)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }
}
