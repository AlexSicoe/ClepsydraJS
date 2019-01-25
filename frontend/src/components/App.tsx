import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeScreen from './home/HomeScreen';
import NoMatch from './NoMatch';
import ProjectScreen from './project/ProjectScreen';
import PublicScreen from './public/PublicScreen';
import { inject, observer } from 'mobx-react';
import AuthStore from '../mobx/stores/AuthStore';
import DevTools from 'mobx-react-devtools';
interface Props {

}

interface InjectedProps {
	authStore: AuthStore
}

interface State {

}

@inject('authStore')
@observer
class App extends Component<Props, State> {
	get injected() {
		return this.props as InjectedProps
	}


	componentWillMount() {
		//TODO Login with persisted token
		//if token expired, redirect to login
	}

	renderRedirect() {
		const { authStore } = this.injected
		return authStore.isAuthenticated ?
			<Redirect to="/home" /> :
			<Redirect to="/" />
	}

	render() {
		return (
			<div>
				{/* <DevTools /> */}
				<Router>
					<>
						<Switch>
							<Route exact path="/" component={PublicScreen} />
							<Route path="/home" component={HomeScreen} />
							<Route path="/projects/:pid" component={ProjectScreen} />
							<Route component={NoMatch} />
						</Switch>
						{this.renderRedirect()}
					</>
				</Router>
			</div>
		)
	}


}

export default App

