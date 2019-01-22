import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthScreen from './auth/AuthScreen';
import HomeScreen from './home/HomeScreen';


const mapStateToProps = (state: any) => ({
	token: state.auth.token,
})

const mapDispatch = {

}


class App extends Component<any, any> {

	componentWillMount() {
		//TODO Login with persisted token
		//if token expired, redirect to login
	}


	renderRedirect() {
		const { token } = this.props
		return token ?
			<Redirect to="/home" /> :
			<Redirect to="/auth" />
	}

	render() {
		return (
			<Router>
				<>
					<Switch>
						<Route path="/auth" component={AuthScreen} />
						<Route path="/home" component={HomeScreen} />
					</Switch>

					{
						this.renderRedirect()
					}
				</>
			</Router>
		)
	}


}

export default connect(mapStateToProps, mapDispatch)(App)

