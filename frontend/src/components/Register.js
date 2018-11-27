import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { getUser, register, setUsername, setPassword, setEmail } from '../actions/user-actions'
import { connect } from 'react-redux'
import displayMessage from '../utils/displayMessage'


const mapStateToProps = (state) => {
  let {
    username, password, email,
    error, fetching, fetched,
    message,
  } = state.user
  return {
    username, password, email,
    error, fetching, fetched,
    message,
  }
}

const mapDispatch = {
  onGetUser: getUser,
  onRegister: register,
  onSetUsername: setUsername,
  onSetPassword: setPassword,
  onSetEmail: setEmail,
}

class Register extends Component {


  render() {
    let { message } = this.props
    displayMessage(message)

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