import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'

import { login } from '../../actions/auth-actions'
import SimpleAppBar from '../view/SimpleAppBar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
  token: state.auth.token,
  fetching: state.auth.fetching,
  fetched: state.auth.fetched,
})

const mapDispatchToProps = {
  login,
}

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    let { username, password } = this.state
    let { login, history } = this.props
    let credentials = { username, password }
    login(credentials, () => history.push('/home'))
  }

  handleKey = (event) => {
    if (event.key === "Enter") {
      this.handleLogin()
    }
  }

  render() {
    return (
      <>
        <SimpleAppBar title="Login" />
        <TextField
          placeholder="Username"
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          name="username"
        />
        <br />
        <TextField
          type="Password"
          placeholder="Password"
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          name="password"
        />
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleLogin}
        >
          Submit
					</Button>
      </>
    )
  }
}

const LoginWithRouter = withRouter(Login)
export default connect(mapStateToProps, mapDispatchToProps)(LoginWithRouter)