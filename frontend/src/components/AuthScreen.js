import React, { Component } from 'react'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from 'material-ui/RaisedButton'
import { BroswerRouter as Router, Route, NavLink as Link } from "react-router-dom";
import { connect } from 'react-redux'
import { getUser, login, register, setUsername, setPassword, setEmail } from '../actions/user-actions'

import Login from './Login'
import Register from './Register'

const mapStateToProps = (state) => ({
  // isAuthorized: state.user.isAuthorized,
  user: state.user.user,
  error: state.user.error,
  fetching: state.user.fetching,
  fetched: state.user.fetched
})

const mapDispatch = {
  onGetUser: getUser,
  onLogin: login,
  onRegister: register,
  onSetUsername: setUsername,
  onSetPassword: setPassword,
  onSetEmail: setEmail
}


class AuthScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDisplayingLogin: true
    }

    this.redirectToLogin = this.redirectToLogin.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div className="loginScreen">
        {this.state.isDisplayingLogin ? this.renderLogin() : this.renderRegister()}
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
    this.state.isDisplayingLogin ?
      this.setState({
        isDisplayingLogin: false
      })
      :
      this.setState({
        isDisplayingLogin: true
      })

  }

  redirectToLogin() {
    this.setState({
      isDisplayingLogin: true
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

export default connect(mapStateToProps, mapDispatch)(AuthScreen)
