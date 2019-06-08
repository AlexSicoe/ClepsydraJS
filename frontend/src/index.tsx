import { Provider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
import AuthStore from './stores/AuthStore'
import ProjectStore from './stores/ProjectStore'
import UserStore from './stores/UserStore'
import * as serviceWorker from './serviceWorker'
import app from './feathersApp'

const userService = app.service('users')
const projectService = app.service('projects')
const memberService = app.service('members')
const stageService = app.service('stages')
const taskService = app.service('tasks')
const userTaskService = app.service('user-tasks')
const swapTasksService = app.service('swap-tasks')
const swapStagesService = app.service('swap-stages')
const taskLogsService = app.service('task-logs')

const authStore = new AuthStore(app, userService)
const userStore = new UserStore(
  app,
  userService,
  projectService,
  memberService,
  taskService,
  userTaskService
)
const projectStore = new ProjectStore(
  app,
  projectService,
  memberService,
  userService,
  stageService,
  taskService,
  swapTasksService,
  swapStagesService,
  taskLogsService
)

const stores = {
  authStore,
  userStore,
  projectStore
}

const root = (
  <Provider {...stores}>
    <App />
  </Provider>
)

ReactDOM.render(root, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
