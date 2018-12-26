import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'

import { login } from '../actions/auth-actions'
import { setUsername, setPassword, setEmail } from '../actions/auth-form-actions'


import HomeScreen from './HomeScreen'

const mapStateToProps = (state) => ({
	username: state.authForm.username,
	password: state.authForm.password,
	email: state.authForm.email,
	token: state.auth.token,
	fetching: state.auth.fetching,
	fetched: state.auth.fetched,
})

const mapDispatch = {
	onLogin: login,
	onSetUsername: setUsername,
	onSetPassword: setPassword,
	onSetEmail: setEmail,
}

class Login extends Component {
	render() {
		let { token } = this.props
		return (
			token ? <RedirectToHomeScreen /> :
				<MuiThemeProvider>
					<>
						<AppBar title="Login" />
						<TextField
							hintText="Enter your Username"
							floatingLabelText="Username"
							onChange={(event, newValue) =>
								this.props.onSetUsername(newValue)
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
						<RaisedButton
							label="Submit"
							primary={true}
							style={style}
							onClick={(event) => this.handleClick(event)} />
					</>
				</MuiThemeProvider>
		)
	}

	handleClick(event) {
		let { username, email, password } = this.props
		let credentials = { username, email, password }
		this.props.onLogin(credentials)
	}

}

const style = {
	margin: 15
}



const RedirectToHomeScreen = (props) =>
	(
		<Router>
			<>
				<Switch>
					<Route path="/home" component={HomeScreen} />
				</Switch>
				<Redirect to="/home" />
			</>
		</Router>
	)


export default connect(mapStateToProps, mapDispatch)(Login)