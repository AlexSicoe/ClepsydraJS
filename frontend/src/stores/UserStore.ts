import { Service } from '@feathersjs/feathers'
import { action, observable, IObservableArray } from 'mobx'
import { PromiseState, SocketEvent } from '../util/enums'
import { notifyError } from '../util/notification-factories'
import { IUser, IProject, ITask } from './model-interfaces'
import { safeSet } from '../util/functions'
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
    private service: Service<IUser>,
    private projectService: Service<IProject>,
    private taskService: Service<ITask>,
    private userTaskService: Service<ITask>
  ) {
    service.on(Updated, (user) => {
      console.log('Updated user', user)
      if (user.id === this.id) {
        this.set(user)
      }
    })

    service.on(Patched, (user) => {
      console.log('Patched user', user)
      if (user.id === this.id) {
        this.set(user)
      }
    })

    service.on(Removed, (user) => {
      console.log('Removed user', user)
      if (user.id === this.id) {
        this.reset()
      }
    })

    projectService.on(Created, (project: IProject) => {
      console.log('Added project', project)
      // if (project.members.find((m) => m.userId === this.id))
      this.addProjectToStore(project)
    })

    projectService.on(Updated, (project) => {
      console.log('Updated project', project)
      this.setProjectFromStore(project)
    })

    projectService.on(Patched, (project) => {
      console.log('Patched project', project)
      this.setProjectFromStore(project)
    })

    projectService.on(Removed, (project) => {
      console.log('Removed project', project)
      this.removeProjectFromStore(project)
    })

    userTaskService.on(Created, (task) => {
      console.log('Task assigned to User', task)
      this.addTaskToStore(task)
    })

    userTaskService.on(Removed, (task) => {
      console.log('Task unassigned from User', task)
      this.removeTaskFromStore(task)
    })

    taskService.on(Removed, (task) => {
      console.log('Task removed', task)
      this.removeTaskFromStore(task)
    })

    taskService.on(Patched, (task) => {
      console.log('Task patched', task)
      this.setTaskFromStore(task)
    })

    taskService.on(Updated, (task) => {
      console.log('Task updated', task)
      this.setTaskFromStore(task)
    })
  }

  @action reset = () => {
    this.state = PENDING
    this.id = undefined
    this.name = ''
    this.email = ''
    this.projects = [] as any
    this.tasks = [] as any
  }

  @action set = (user: Partial<IUser>) => {
    this.id = user.id
    this.name = safeSet(user.name, this.name)
    this.email = safeSet(user.email, this.email)
    this.projects = safeSet(user.projects, this.projects)
    this.tasks = safeSet(user.tasks, this.tasks)
  }

  @action addProjectToStore = (project: IProject) => {
    this.projects.push(project)
  }

  @action setProjectFromStore = (project: IProject) => {
    const index = this.projects.findIndex((p) => p.id === project.id)
    if (index !== -1) {
      this.projects[index] = project
    }
  }

  @action removeProjectFromStore = (project: IProject) => {
    const index = this.projects.findIndex((p) => p.id === project.id)
    if (index !== -1) {
      this.projects.splice(index, 1)
    }
  }

  @action addTaskToStore = (task: ITask) => {
    this.tasks.push(task)
  }

  @action setTaskFromStore = (task: ITask) => {
    const index = this.tasks.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      this.tasks[index] = task
    }
  }

  @action removeTaskFromStore = (task: ITask) => {
    const index = this.tasks.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      this.tasks.splice(index, 1)
    }
  }

  get = async () => {
    const PARAMS = {
      query: {
        $whoAmI: 'true'
      }
    }
    try {
      this.state = PENDING
      const user = await this.service.find(PARAMS)
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
      const res = await this.service.update(id, user)

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
      const res = await this.service.patch(id, user)

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
}
