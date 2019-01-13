import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../actions/auth-actions'
import HomeScreen from './HomeScreen'
import SimpleAppBar from './view/SimpleAppBar';

const mapStateToProps = (state) => ({
  token: state.auth.token,
  fetching: state.auth.fetching,
  fetched: state.auth.fetched,
})

const mapDispatchToProps = {
  onLogin: login,
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(event) {
    let { username, password } = this.state
    let { onLogin } = this.props
    let credentials = { username, password }
    onLogin(credentials)
  }

  handleKey(e) {
    if (e.key === "Enter") {
      this.handleClick()
    }
  }

  render() {
    let { token } = this.props
    return (
      token ? <RedirectToHomeScreen /> :
        <>
          <SimpleAppBar title="Login" />
          <TextField
            placeholder="Username"
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleKey(e)}
            name="username"
          />
          <br />
          <TextField
            type="Password"
            placeholder="Password"
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleKey(e)}
            name="password"
          />
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={e => this.handleClick(e)}
          >
            Submit
					</Button>
        </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


function RedirectToHomeScreen(props) {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/home" component={HomeScreen} />
        </Switch>
        <Redirect to="/home" />
      </>
    </Router>
  )
}

