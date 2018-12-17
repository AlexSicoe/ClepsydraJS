import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetApp } from '../actions/root-actions'
import { fetchProjectsFromUser } from '../actions/project-actions'
import { fetchUser } from '../actions/user-actions'
import HomeView from './HomeView'

const mapStateToProps = (state) => ({
  token: state.auth.token,
  authError: state.auth.error, //if this exists, reset app
  uid: state.auth.uid,
})

const mapDispatchToProps = {
  onFetchUser: fetchUser,
  onFetchProjectsFromUser: fetchProjectsFromUser,
  onLogout: resetApp,
}

class HomeScreen extends Component {

  componentWillMount() {
    const { uid, token, onLogout } = this.props
    if (!token) { onLogout() }
    else {
      this.props.onFetchUser(uid, token)
      this.props.onFetchProjectsFromUser(uid, token)
    }
  }

  render() {
    // const { authError, onLogout } = this.props



    return (
      //authError ? onLogout() :

      <HomeView />

    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)                    