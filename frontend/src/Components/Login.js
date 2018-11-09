import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'

import HomeScreen from './HomeScreen'

export default class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			isAuthorized: false,
		}
	}

	render() {
		return (
			this.state.isAuthorized ? (<RedirectToHomeScreen email={this.state.email} />) :
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
					this.setState({ isAuthorized: true }) //TODO, token in state, verify with token

				} else if (response.status === 401) {
					console.log('Email & Password do not match') //FIXME gets caught as error
					alert('Email & Password do not match')
					// this.setState({ isAuthorized: false})
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