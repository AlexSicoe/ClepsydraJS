import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import './App.css'
import HomeScreen from './home/HomeScreen'
import NoMatch from './NoMatch'
import ProjectScreen from './project/ProjectScreen'
import PublicScreen from './public/PublicScreen'
import { inject, observer } from 'mobx-react'
import AuthStore from '../stores/AuthStore'
import Area51 from './public/Area51'

interface IInjectedProps {
  authStore: AuthStore
}

@inject('authStore')
@observer
class App extends Component<any, any> {
  get injected() {
    return this.props as IInjectedProps
  }

  componentWillMount() {
    // TODO Login with persisted token
    // if token expired, redirect to login
  }

  renderRedirect() {
    const { authStore } = this.injected
    return authStore.isAuthenticated ? (
      <Redirect to="/home" />
    ) : (
      <Redirect to="/" />
    )
  }

  render() {
    return (
      <div>
        {/* <DevTools /> */}
        <Router>
          <>
            <Switch>
              <Route exact path="/" component={PublicScreen} />
              <Route path="/home" component={HomeScreen} />
              <Route path="/projects/:pid" component={ProjectScreen} />
              <Route path="/area51" component={Area51} />
              <Route component={NoMatch} />
            </Switch>
            {/* {this.renderRedirect()} */}
          </>
        </Router>
      </div>
    )
  }
}

export default App
