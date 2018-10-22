import React, { Component } from 'react'
import LoginScreen from "./LoginScreen";
import './App.css'
import { BrowserRouter as Router, Route, Redirect, Switch, browserHistory as history } from 'react-router-dom'
import UploadScreen from './UploadScreen';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,

    }
  }

  componentWillMount() {
    //TODO Ask server if logged in
  }

  render() {
    return (
      <Router>
        <>
          <Route path="/home" render={() => <UploadScreen /*TODO what user?*/ />
          } />
          <Route path="/login" render={() => <LoginScreen /*TODO props*/ />
          } />
          <Route exact path="/" render={() => (
            this.state.isLoggedIn ? (
              <Redirect to="/home" />
            ) : (
                <Redirect to="/login" />
              )
          )} />
        </>
      </Router>
    )
  }
}
