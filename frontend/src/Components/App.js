import React, { Component } from 'react'
import LoginScreen from "./LoginScreen";
import './App.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import HomeScreen from './HomeScreen';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthorized: false,
    }
  }

  componentWillMount() {
    //TODO Ask server if logged in
  }

  render() {
    var email = 'dummy@dummy.com'
    return (
      <Router>
        <>
          <Route path="/home" render={() =>
            <HomeScreen email={email} />
          } />
          <Route path="/login" render={() =>
            <LoginScreen /*TODO props*/ />
          } />
          <Route exact path="/" render={() => (
            this.state.isAuthorized ? (
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
