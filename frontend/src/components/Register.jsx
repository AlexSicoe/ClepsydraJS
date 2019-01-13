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

  handleClick(event) {
    let { username, email, password } = this.props
    let credentials = { username, email, password }
    this.props.onRegister(credentials)
  }

  handleKey(e) {
    if (e.key === "Enter") {
      this.handleClick()
    }
  }

  render() {
    const { onSetUsername, onSetEmail, onSetPassword } = this.props

    return (
      <>
        <SimpleAppBar title="Register" />
        <TextField
          placeholder="Username"
          onChange={e => onSetUsername(e.target.value)}
          onKeyDown={e => this.handleKey(e)}
        />
        <br />
        <TextField
          placeholder="Email"
          type="email"
          onChange={e => onSetEmail(e.target.value)}
          onKeyDown={e => this.handleKey(e)}
        />
        <br />
        <TextField
          placeholder="Password"
          type="password"
          onChange={e => onSetPassword(e.target.value)}
          onKeyDown={e => this.handleKey(e)}
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


export default connect(mapStateToProps, mapDispatch)(Register)