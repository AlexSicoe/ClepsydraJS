import React, { Component } from 'react'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from 'material-ui/RaisedButton'
import { BroswerRouter as Router, Route, NavLink as Link } from "react-router-dom";

import Login from './Login'
import Register from './Register'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            loginMessage: 'Not Registered yet? Go to Registration',
            buttonLabel: 'Register',
            isLogin: true
        }

        this.redirectToLogin = this.redirectToLogin.bind(this)
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="loginScreen">
                {this.state.isLogin ? this.renderLogin() : this.renderRegister()}
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
        )
    }

    renderLogin() {
        return (
            <Login />            
        )
    }

    renderRegister() {
        return (
            <Register handleSuccess = {this.redirectToLogin} />
        )
    }

    handleClick(event) {
        // console.log("event: ", event)
        if (this.state.isLogin) {
            this.setState({
                loginMessage: 'Already registered? Go to Login',
                buttonLabel: 'Login',
                isLogin: false
            })
        } else {
            this.setState({
                loginMessage: 'Not Registered yet? Go to Registration',
                buttonLabel: 'Register',
                isLogin: true
            })
        }
    }

    redirectToLogin() {
        this.setState({
            loginMessage: 'Not Registered yet? Go to Registration',
            buttonLabel: 'Register',
            isLogin: true
        })
    }
}
const style = {
    margin: 15
}

function SubComponent() {
  return (
    <div>
      
    </div>
  )
}
