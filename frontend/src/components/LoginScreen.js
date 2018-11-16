import React, { Component } from 'react'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from 'material-ui/RaisedButton'
import { BroswerRouter as Router, Route, NavLink as Link } from "react-router-dom";

import Login from './Login'
import Register from './Register'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isLogin: true
    }

    this.redirectToLogin = this.redirectToLogin.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div className="loginScreen">
        {this.state.isLogin ? this.renderLogin() : this.renderRegister()}
      </div>
    )
  }

  renderLogin() {
    return (
      <>
        <Login />
        <Footer
          loginMessage="Not Registered yet? Go to Registration"
          buttonLabel="Register"
          handleClick={this.handleClick}
        />
      </>
    )
  }

  renderRegister() {
    return (
      <>
        <Register handleSuccess={this.redirectToLogin} />
        <Footer
          loginMessage="Already registered? Go to Login"
          buttonLabel="Login"
          handleClick={this.handleClick}
        />
      </>
    )
  }

  handleClick(e) {
    // console.log("event: ", event)
    e.preventDefault()
    this.state.isLogin ?
      this.setState({
        isLogin: false
      })
      :
      this.setState({
        isLogin: true
      })

  }

  redirectToLogin() {
    this.setState({
      isLogin: true
    })
  }
}

const Footer = (props) =>
  (
    <>
      {props.loginMessage}
      <MuiThemeProvider>
        <div>
          <RaisedButton label={props.buttonLabel}
            primary={true}
            style={style}
            onClick={(event) => props.handleClick(event)} />
        </div>
      </MuiThemeProvider>
    </>
  )

const style = {
  margin: 15
}
