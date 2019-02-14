import { Provider } from 'mobx-react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './index.css'
import AuthStore from './stores/AuthStore'
import ProjectStore from './stores/ProjectStore'
import UserStore from './stores/UserStore'
import * as serviceWorker from './serviceWorker'
import feathersApp from './feathersApp'

const authService = feathersApp.service('authenticate')
const userService = feathersApp.service('users')
const projectService = feathersApp.service('projects')
const memberService = feathersApp.service('members')
const stageService = feathersApp.service('stages')
const taskService = feathersApp.service('tasks')
const userTaskService = feathersApp.service('user-tasks')

const authStore = new AuthStore(userService, authService)
const {accessToken} = authStore
const userStore = new UserStore(userService, accessToken)
const projectStore = new ProjectStore(projectService, memberService, accessToken)

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
