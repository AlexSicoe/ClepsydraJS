import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { getUser, login, setUsername, setPassword, setEmail } from '../actions/user-actions'
import { connect } from 'react-redux'
import displayServerMessage from '../utils/displayServerMessage'


import HomeScreen from './HomeScreen'

const mapStateToProps = (state) => ({
	username: state.user.username,
	password: state.user.password,
	email: state.user.email,
	token: state.user.token,

	message: state.user.message,

	error: state.user.error,
	fetching: state.user.fetching,
	fetched: state.user.fetched
})

const mapDispatch = {
	onGetUser: getUser,
	onLogin: login,
	onSetUsername: setUsername,
	onSetPassword: setPassword,
	onSetEmail: setEmail,
}

class Login extends Component {

	render() {
		let { message } = this.props
		displayServerMessage(message)


		return (
			this.props.token !== '' ? (<RedirectToHomeScreen email={this.props.email} />) : //TODO modify
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

	// displayServerMessage(message) {
	// 	if (message) {
	// 		alert(message)
	// 		this.props.onClearMessage()
	// 	}
	// }

	handleClick(event) {
		let credentials = {
			'username': this.props.username,
			'email': this.props.email,
			'password': this.props.password
		}

		this.props.onLogin(credentials)

		// const SERVER = 'http://localhost:4000/api'
		// var payload = {
		// 	'email': this.state.email,
		// 	'password': this.state.password
		// }
		// axios.post(SERVER + '/login', payload)
		// 	.then((response) => {
		// 		console.log(response)
		// 		if (response.status === 200) {
		// 			console.log('Login Successful')
		// 			this.setState({ isAuthorized: true }) //TODO, token in state, verify with token

		// 		} else if (response.status === 401) {
		// 			console.log('Email & Password do not match') //FIXME gets caught as error
		// 			alert('Email & Password do not match')
		// 			// this.setState({ isAuthorized: false})
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	})
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