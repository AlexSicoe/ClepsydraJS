import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { getUser, register, setUsername, setPassword, setEmail } from '../actions/user-actions'
import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  // isAuthorized: state.user.isAuthorized,
  username: state.user.username,
  password: state.user.password,
  email: state.user.email,
  token: state.user.token,

  error: state.user.error,
  fetching: state.user.fetching,
  fetched: state.user.fetched
})

const mapDispatch = {
  onGetUser: getUser,
  onRegister: register,
  onSetUsername: setUsername,
  onSetPassword: setPassword,
  onSetEmail: setEmail
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
    let credentials = {
      'username': this.props.username,
      'email': this.props.email,
      'password': this.props.password
    }
    this.props.onRegister(credentials)

    // const SERVER = 'http://localhost:4000/api'

    // console.log('values',
    //   this.state.username,
    //   this.state.email,
    //   this.state.password);
    // //TODO validate empty values before hitting submit
    // var payload = {
    //   'username': this.state.username,
    //   'email': this.state.email,
    //   'password': this.state.password
    // }

    // axios.post(SERVER + '/register', payload)
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status === 201) {
    //       // console.log('registration successful')
    //       this.props.handleSuccess()
    //     } else {
    //       alert('An error occurred. Please try again.')
    //     }
    //   })
    //   .catch((error) => console.log(error))
  }
}

const style = {
  margin: 15
}

export default connect(mapStateToProps, mapDispatch)(Register)