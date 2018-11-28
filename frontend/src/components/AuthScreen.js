import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import AuthFooter from './AuthFooter';

const mapStateToProps = (state) => ({

})

const mapDispatch = {

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
        <Router>

        </Router>

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

  handleClick(e) {
    e.preventDefault()
    this.state.isDisplayingLogin ?
      this.setState({ isDisplayingLogin: false })
      :
      this.setState({ isDisplayingLogin: true })

  }

  redirectToLogin() {
    this.setState({
      isDisplayingLogin: true
    })
  }
}




export default connect(mapStateToProps, mapDispatch)(AuthScreen)
