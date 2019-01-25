import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import AuthApi from './mobx/requests/AuthApi';
import ProjectApi from './mobx/requests/ProjectApi';
import SprintApi from './mobx/requests/SprintApi';
import UserApi from './mobx/requests/UserApi';
import AuthStore from './mobx/stores/AuthStore';
import ProjectStore from './mobx/stores/ProjectStore';
import SprintStore from './mobx/stores/SprintStore';
import UserStore from './mobx/stores/UserStore';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';

const stores = {
  authStore: new AuthStore(new AuthApi),
  userStore: new UserStore(new UserApi),
  projectStore: new ProjectStore(new ProjectApi),
  sprintStore: new SprintStore(new SprintApi),
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
