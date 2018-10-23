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
      isLoggedIn: false,

    }
  }

  componentWillMount() {
    //TODO Ask server if logged in
  }

  render() {
    var userData = 'LOREM IPSUM DOLOR SIT AMET'
    return (
      <Router>
        <>
          <Route path="/home" render={() =>
            <HomeScreen userData={userData} />
          } />
          <Route path="/login" render={() =>
            <LoginScreen /*TODO props*/ />
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
