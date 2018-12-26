import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from '../material-styles'
import { login } from '../actions/auth-actions'
import { setUsername, setPassword, setEmail } from '../actions/auth-form-actions'
import HomeScreen from './HomeScreen'
import SimpleAppBar from './dumb/SimpleAppBar';



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
				<>
					<SimpleAppBar title="Login" />
					<TextField
						placeholder="Username"
						onChange={(event) =>
							this.props.onSetUsername(event.target.value)
						} />
					<br />
					<TextField
						type="Password"
						placeholder="Password"
						onChange={(event) =>
							this.props.onSetPassword(event.target.value)
						} />
					<br />
					<Button
						color="primary"
						variant="contained"
						onClick={(event) => this.handleClick(event)}
					>
						Submit
					</Button>
				</>
		)
	}

	handleClick(event) {
		let { username, email, password } = this.props
		let credentials = { username, email, password }
		this.props.onLogin(credentials)
	}

}

const reduxContainer = connect(mapStateToProps, mapDispatch)(Login)
export default withStyles(styles)(reduxContainer)


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

