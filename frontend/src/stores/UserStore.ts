import { Service, Application } from '@feathersjs/feathers'
import { action, observable, IObservableArray } from 'mobx'
import { PromiseState, SocketEvent } from '../util/enums'
import { notifyError } from '../util/notification-factories'
import { IUser, IProject, ITask } from './model-interfaces'
import { safeSet } from '../util/functions'
import HyperArray from './../util/HyperArray'
const { PENDING, DONE, ERROR } = PromiseState
const { Created, Updated, Patched, Removed } = SocketEvent

export default class UserStore {
  @observable state: PromiseState = PENDING
  @observable id?: number
  @observable name: string = ''
  @observable email: string = ''
  @observable projects: IProject[] = []
  @observable tasks: ITask[] = []

  constructor(
    app: Application<any>,
    private userService: Service<IUser>,
    private projectService: Service<IProject>,
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
      console.log('Removed user', user)
      if (user.id === this.id) {
        this.reset()
      }
    })

    projectService.on(Created, (project: IProject) => {
      console.log('Added project', project)
      // if (project.members.find((m) => m.userId === this.id))
      new HyperArray(this.projects).add(project)
    })

    projectService.on(Updated, (project) => {
      console.log('Updated project', project)
      new HyperArray(this.projects).set(project)
    })

    projectService.on(Patched, (project) => {
      console.log('Patched project', project)
      new HyperArray(this.projects).set(project)
    })

    projectService.on(Removed, (project) => {
      console.log('Removed project', project)
      new HyperArray(this.projects).remove(project)
    })

    userTaskService.on(Created, (task) => {
      console.log('Task assigned to User', task)
      new HyperArray(this.tasks).add(task)
    })

    userTaskService.on(Removed, (task) => {
      console.log('Task unassigned from User', task)
      new HyperArray(this.tasks).remove(task)
    })

    taskService.on(Removed, (task) => {
      console.log('Task removed', task)
      new HyperArray(this.tasks).remove(task)
    })

    taskService.on(Patched, (task) => {
      console.log('Task patched', task)
      new HyperArray(this.tasks).set(task)
    })

    taskService.on(Updated, (task) => {
      console.log('Task updated', task)
      new HyperArray(this.tasks).set(task)
    })
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
    this.name = ''
    this.email = ''
    this.projects = []
    this.tasks = []
  }

  @action set = (user: Partial<IUser>) => {
    this.id = user.id
    this.name = safeSet(user.name, this.name)
    this.email = safeSet(user.email, this.email)
    this.projects = safeSet(user.projects, this.projects)
    this.tasks = safeSet(user.tasks, this.tasks)
  }

  get = async () => {
    const PARAMS = {
      query: {
        $whoAmI: 'true'
      }
    }
    try {
      this.state = PENDING
      const user = await this.userService.find(PARAMS)
      this.state = DONE
      this.set(user as IUser)
    } catch (err) {
      this.state = ERROR
      notifyError(err)
    }
  }

  update = async (id: number, user: IUser) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      const res = await this.userService.update(id, user)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }

  patch = async (id: number, user: Partial<IUser>) => {
    // const header: IAuthHeader = { accessToken }
    try {
      this.state = PENDING
      const res = await this.userService.patch(id, user)

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
      const res = await this.userService.remove(id)

      this.state = DONE
      console.log(res)
    } catch (err) {
      this.state = ERROR
      // notifyError(err)
      console.log(err)
    }
  }
}
