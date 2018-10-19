import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'

import Login from './Login'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            first_name: '',
            last_name: '',
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
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange={(event, newValue) =>
                                this.setState({ first_name: newValue })
                            } />
                        <br />
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange={(event, newValue) =>
                                this.setState({ last_name: newValue })
                            } />
                        <br />
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) =>
                                this.setState({ email: newValue })
                            } />
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
        var apiBaseUrl = 'http://localhost:4000/api'

        console.log('values',
            this.state.first_name,
            this.state.last_name,
            this.state.email,
            this.state.password);
        //TODO check for empty values before hitting submit
        var self = this;
        var payload = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password
        }

        axios.post(apiBaseUrl + '/register', payload)
            .then((response) => {
                console.log(response);
                if (response.data.code === 200) {
                    // console.log('registration successful')
                    var loginScreen = []
                    loginScreen.push(<Login parentContext={this} />)
                    var loginMessage = 'Not Registered yet. Go to registration'
                    self.props.parentContext.setState({
                        loginScreen: loginScreen,
                        loginMessage: loginMessage,
                        buttonLabel: 'Register',
                        isLogin: true
                    })
                }
            })
            .catch((error) => console.log(error))


    }
}

const style = {
    margin: 15
}
