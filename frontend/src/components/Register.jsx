import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'

import { register } from '../actions/auth-actions'
import { setUsername, setPassword, setEmail } from '../actions/auth-form-actions'
import SimpleAppBar from './view/SimpleAppBar';


const mapStateToProps = (state) => ({
  username: state.authForm.username,
  password: state.authForm.password,
  email: state.authForm.email,
  fetching: state.auth.fetching,
  fetched: state.auth.fetched,
})

const mapDispatch = {
  onRegister: register,
  onSetUsername: setUsername,
  onSetPassword: setPassword,
  onSetEmail: setEmail,
}

class Register extends Component {
  render() {
    return (
      <>
        <SimpleAppBar title="Register" />
        <TextField
          placeholder="Username"
          onChange={(event) =>
            this.props.onSetUsername(event.target.value)
          } />
        <br />
        <TextField
          placeholder="Email"
          type="email"
          onChange={(event) =>
            this.props.onSetEmail(event.target.value)
          } />
        <br />
        <TextField
          placeholder="Password"
          type="password"
          onChange={(event) =>
            this.props.onSetPassword(event.target.value)
          } />
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={(event) => this.handleClick(event)}
        >
          Submit
        </Button>
      </>
    )
  }

  handleClick(event) {
    let { username, email, password } = this.props
    let credentials = { username, email, password }
    this.props.onRegister(credentials)
  }
}


export default connect(mapStateToProps, mapDispatch)(Register)