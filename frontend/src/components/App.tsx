import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import HomeScreen from './home/HomeScreen'
import NoMatch from './NoMatch'
import ProjectScreen from './project/ProjectScreen'
import KanbanPlayground from './public/KanbanPlayground'
import PublicScreen from './public/PublicScreen'
import ChartPlayground from './public/ChartPlayground'

class App extends Component<any, any> {
  render() {
    return (
      <div>
        <Router>
          <>
            <Switch>
              <Route exact path="/" component={PublicScreen} />
              <Route path="/home" component={HomeScreen} />
              <Route path="/projects/:projectId" component={ProjectScreen} />
              <Route path="/kanbanPlayground" component={KanbanPlayground} />
              <Route path="/chartPlayground" component={ChartPlayground} />
              <Route component={NoMatch} />
            </Switch>
          </>
        </Router>
      </div>
    )
  }
}

export default App
