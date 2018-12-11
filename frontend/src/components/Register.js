import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'

import { register } from '../actions/auth-actions'
import { setUsername, setPassword, setEmail } from '../actions/auth-form-actions'


const mapStateToProps = (state) => ({
  username: state.authForm.username,
  password: state.authForm.password,
  email: state.authForm.email,
  fetching: state.user.fetching,
  fetched: state.user.fetched,
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
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Register" />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.props.onSetUsername(newValue)
              } />
            <br />
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={(event, newValue) =>
                this.props.onSetEmail(newValue)
              } />
            <br />
            <TextField
              type="password"
              hintText="Enter your password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.props.onSetPassword(newValue)
              } />
            <br />
            <RaisedButton label="Submit"
              primary={true}
              style={style}
              onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

  handleClick(event) {
    let { username, email, password } = this.props
    let credentials = { username, email, password }
    this.props.onRegister(credentials)
  }
}

const style = {
  margin: 15
}

export default connect(mapStateToProps, mapDispatch)(Register)