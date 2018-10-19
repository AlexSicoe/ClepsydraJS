import React, { Component } from 'react'
import LoginScreen from "./LoginScreen";
import './App.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginPage: [],
      uploadScreen: []
    }
  }

  componentWillMount() {
    var loginPage = []
    loginPage.push(<LoginScreen parentContext={this} />)
    this.setState({
      loginPage: loginPage
    })
  }

  render() {
    return (
      <div>
        {this.state.loginPage}
        {this.state.uploadScreen}
      </div>
    )
  }
}
const style = {
  margin: 15
}
