import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { login, setUsername, setPassword, setEmail } from '../actions/user-actions'
import { connect } from 'react-redux'
import displayMessage from '../utils/displayMessage'


import HomeScreen from './HomeScreen'

const mapStateToProps = (state) => {
	let {
		username, password, email, token,
		error, fetching, fetched,
		message, } = state.user
	return {
		username, password, email, token,
		error, fetching, fetched,
		message,
	}
}

const mapDispatch = {
	onLogin: login,
	onSetUsername: setUsername,
	onSetPassword: setPassword,
	onSetEmail: setEmail,
}

class Login extends Component {
	render() {
		let { message, token, error } = this.props
		displayMessage(message)




		return (
			token && !error ? <RedirectToHomeScreen /> : //TODO modify
				<>
					<MuiThemeProvider>
						<div>
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
						</div>
					</MuiThemeProvider>
				</>
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