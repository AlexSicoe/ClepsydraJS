import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

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
                this.setState({ username: newValue })
              } />
            <br />
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={(event, newValue) =>
                this.setState({ email: newValue })
              } />
            <br />
            <TextField
              type="password"
              hintText="Enter your password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
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
    const SERVER = 'http://localhost:4000/api'

    console.log('values',
      this.state.username,
      this.state.email,
      this.state.password);
    //TODO validate empty values before hitting submit
    var payload = {
      'username': this.state.username,
      'email': this.state.email,
      'password': this.state.password
    }

    axios.post(SERVER + '/register', payload)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          // console.log('registration successful')
          this.props.handleSuccess()
        } else {
          alert('An error occurred. Please try again.')
        }
      })
      .catch((error) => console.log(error))


  }
}

const style = {
  margin: 15
}
