import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'


import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../actions/auth-actions'
import { setUsername, setPassword, setEmail } from '../actions/auth-form-actions'
import HomeScreen from './HomeScreen'
import SimpleAppBar from './view/SimpleAppBar';



const mapStateToProps = (state) => ({
	username: state.authForm.username,
	password: state.authForm.password,
	email: state.authForm.email,
	token: state.auth.token,
	fetching: state.auth.fetching,
	fetched: state.auth.fetched,
})

const mapDispatchToProps = {
	onLogin: login,
	onSetUsername: setUsername,
	onSetPassword: setPassword,
	onSetEmail: setEmail,
}

class Login extends Component {
	
	handleClick(event) {
		let { username, password, onLogin } = this.props
		let credentials = { username, password }
		onLogin(credentials)
	}

	handleKey(e) {
		if (e.key === "Enter") {
			this.handleClick()
		}
	}

	render() {
		let { token, onSetUsername, onSetPassword } = this.props
		return (
			token ? <RedirectToHomeScreen /> :
				<>
					<SimpleAppBar title="Login" />
					<TextField
						placeholder="Username"
						onChange={e => onSetUsername(e.target.value)}
						onKeyDown={e => this.handleKey(e)}
					/>
					<br />
					<TextField
						type="Password"
						placeholder="Password"
						onChange={e => onSetPassword(e.target.value)}
						onKeyDown={e => this.handleKey(e)}
					/>
					<br />
					<Button
						color="primary"
						variant="contained"
						onClick={e => this.handleClick(e)}
					>
						Submit
					</Button>
				</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


function RedirectToHomeScreen(props) {
	return (
		<Router>
			<>
				<Switch>
					<Route path="/home" component={HomeScreen} />
				</Switch>
				<Redirect to="/home" />
			</>
		</Router>
	)
}

