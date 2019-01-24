import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeScreen from './home/HomeScreen';
import NoMatch from './NoMatch';
import PublicScreen from './public/PublicScreen';


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
			<Redirect to="/" />
	}

	render() {
		return (
			<Router>
				<>
					<Switch>
						<Route exact path="/" component={PublicScreen} />
						<Route path="/home" component={HomeScreen} />
						<Route component= {NoMatch}/>
					</Switch>
					{this.renderRedirect()}
				</>
			</Router>
		)
	}


}

export default connect(mapStateToProps, mapDispatch)(App)

