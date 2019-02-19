import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthStore from '../stores/AuthStore'
import './App.css'
import HomeScreen from './home/HomeScreen'
import NoMatch from './NoMatch'
import ProjectScreen from './project/ProjectScreen'
import Area51 from './public/Area51'
import PublicScreen from './public/PublicScreen'

class App extends Component<any, any> {
  render() {
    return (
      <div>
        <Router>
          <>
            <Switch>
              <Route exact path="/" component={PublicScreen} />
              <Route path="/home" component={HomeScreen} />
              <Route path="/projects/:pid" component={ProjectScreen} />
              <Route path="/area51" component={Area51} />
              <Route component={NoMatch} />
            </Switch>
          </>
        </Router>
      </div>
    )
  }
}

export default App
