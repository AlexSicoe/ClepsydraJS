import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'

import React, { Component } from 'react'

import UploadScreen from "./UploadScreen"

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login" />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange={(event, newValue) =>
                                this.setState({ username: newValue })
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
                        <RaisedButton
                            label="Submit"
                            primary={true}
                            style={style}
                            onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

    handleClick(event) {
        var apiBaseUrl = 'http://localhost:4000/api'
        var self = this
        var payload = {
            'email': this.state.username,
            'password': this.state.password
        }
        axios.post(apiBaseUrl + '/login', payload)
            .then((response) => {
                console.log(response)
                if (response.data.code === 200) {
                    console.log('Login successful')
                    var uploadScreen = []
                    uploadScreen.push(<UploadScreen app context={self.props.appContext} />)
                    self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
                } else if (response.data.code === 204) {
                    console.log('Username & password do not match')
                    alert('Username & password do not match')
                } else {
                    console.log('Username doesn\'t exist')
                    alert('Username doesn\'t exist')
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
}
const style = {
    margin: 15
}