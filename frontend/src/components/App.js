import React, { Component } from 'react'
import AuthScreen from './AuthScreen'
import './App.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import HomeScreen from './HomeScreen'


const mapStateToProps = (state) => ({
	token: state.auth.token,
})

const mapDispatch = {

}


class App extends Component {

	componentWillMount() {
		//TODO Login with persisted token
		//if token expired, redirect to login
	}

	render() {
		return (
			<Router>
				<>
					<Switch>
						<Route exact path="/auth" component={AuthScreen} />
						<Route exact path="/home" component={HomeScreen} />
					</Switch>

					{
						!this.props.token ?
							<Redirect to="/auth" /> :
							<Redirect to="/home" />
					}
				</>
			</Router>
		)
	}
}

export default connect(mapStateToProps, mapDispatch)(App)

