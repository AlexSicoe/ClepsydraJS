import React, { Component } from 'react'
import AuthScreen from './AuthScreen'
import './App.css'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser, } from '../actions/user-actions'

import HomeScreen from './HomeScreen'




const mapStateToProps = (state) => ({
	token: state.user.token,
})

const mapDispatch = {
	
}


class App extends Component {

	componentWillMount() {
		//TODO Login with persisted token
		//if token expired, redirect to login
	}

	render() {
		var email = 'dummy@dummy.com'
		return (
			<Router>
				<>
					<Route path="/auth" render={() =>
						<AuthScreen /*TODO props*/ />
					} />
					<Route exact path="/" render={() => (
						<Redirect to="/auth" />
					)} />
				</>
			</Router>
		)
	}
}

export default connect(mapStateToProps, mapDispatch)(App)