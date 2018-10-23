import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'

import HomeScreen from "./HomeScreen"

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
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
                            hintText="Enter your Email"
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
        const SERVER = 'http://localhost:4000/api'
        var payload = {
            'email': this.state.email,
            'password': this.state.password
        }
        axios.post(SERVER + '/login', payload)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    console.log('Login Successful')
                    //TODO Redirect to HomeScreen
                    redirectToHomeScreen('LOREM IPSUM 7000') //FIXME
                } else if (response.status === 401) {
                    console.log('Email & Password do not match') //FIXME gets caught as error
                    alert('Email & Password do not match')
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


function redirectToHomeScreen(userData) {
    return (
        <div>
            <Router>
                <>
                    <Route path="/home" render={() =>
                        <HomeScreen userData={userData} />
                    } />
                    <Redirect to="/home" />
                </>
            </Router>
        </div>
    )
}
