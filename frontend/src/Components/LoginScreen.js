import React, { Component } from 'react'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from 'material-ui/RaisedButton'

import Login from './Login'
import Register from './Register'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            loginScreen: [],
            loginMessage: '',
            buttonLabel: 'Register',
            isLogin: true
        }
    }

    componentWillMount() {
        var loginScreen = []
        loginScreen.push(
            <Login parentContext={this}
                appContext={this.props.parentContext} />
        )
        var loginMessage = 'Not registered yet, Register Now'
        this.setState({
            loginScreen: loginScreen,
            loginMessage: loginMessage
        })
    }

    render() {
        return (
            <div className="loginScreen">
                {this.state.loginScreen}
                <div>
                    {this.state.loginMessage}
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={this.state.buttonLabel}
                                primary={true}
                                style={style}
                                onClick={(event) => this.handleClick(event)} />
                        </div>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }

    handleClick(event) {
        console.log("event: ",event)
        var loginMessage
        var loginScreen = []
        if (this.state.isLogin) {
            loginScreen.push(<Register parentContext={this} />)
            loginMessage = 'Already registered. Go to Login'
            this.setState({
                loginScreen: loginScreen,
                loginMessage: loginMessage,
                buttonLabel: 'Login',
                isLogin: false
            })
        } else {
            loginScreen.push(<Login parentContext={this} />)
            loginMessage = 'Not Registered yet. Go to Registration'
            this.setState({
                loginScreen: loginScreen,
                loginMessage: loginMessage,
                buttonLabel: 'Register',
                isLogin: true
            })
        }
    }
}
const style = {
    margin: 15
}
