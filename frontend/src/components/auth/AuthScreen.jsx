import React, { Component } from 'react'
import Login from './Login'
import Register from './Register'
import AuthFooter from './AuthFooter'
export default class AuthScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDisplayingLogin: true
    }

    this.redirectToLogin = this.redirectToLogin.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.state.isDisplayingLogin ?
      this.setState({ isDisplayingLogin: false }) :
      this.setState({ isDisplayingLogin: true })
  }

  redirectToLogin() {
    this.setState({
      isDisplayingLogin: true
    })
  }

  renderLogin() {
    return (
      <>
        <Login />
        <AuthFooter
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
        <AuthFooter
          loginMessage="Already registered? Go to Login"
          buttonLabel="Login"
          handleClick={this.handleClick}
        />
      </>
    )
  }

  render() {
    return (
      <div className="loginScreen">
        {this.state.isDisplayingLogin ?
          this.renderLogin() :
          this.renderRegister()}
      </div>
    )
  }
}