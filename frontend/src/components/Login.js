import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { getUser, login, setUsername, setPassword, setEmail } from '../actions/user-actions'
import { connect } from 'react-redux'
import displayMessage from '../utils/displayMessage'


import HomeScreen from './HomeScreen'

const mapStateToProps = (state) => {
	let {
		username, password, email, token,
		error, fetching, fetched,
		message,
	} = state.user
	return {
		username, password, email, token,
		error, fetching, fetched,
		message,
	}
}

const mapDispatch = {
	onGetUser: getUser,
	onLogin: login,
	onSetUsername: setUsername,
	onSetPassword: setPassword,
	onSetEmail: setEmail,
}

class Login extends Component {
	render() {
		let { message, token, error, email } = this.props
		displayMessage(message)


		return (
			token && !error !== '' ? (<RedirectToHomeScreen email={email} />) : //TODO modify
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
		<div>
			<Router>
				<>
					<Route path="/home" render={() =>
						<HomeScreen email={props.email} />
					} />
					<Route exact path="/login" render={() => (
						<Redirect to="/home" />
					)}
					/>
				</>
			</Router>
		</div>
	)


export default connect(mapStateToProps, mapDispatch)(Login)