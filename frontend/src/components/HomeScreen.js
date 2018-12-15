import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { resetApp } from '../actions/root-actions'
import { postProject, fetchProjectsFromUser } from '../actions/project-actions'
import { fetchUser } from '../actions/user-actions'

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    authError: state.auth.error, //if this exists, reset app
    uid: state.auth.uid,
  }
}

const mapDispatchToProps = {
  onFetchUser: fetchUser,
  onFetchProjectsFromUser: fetchProjectsFromUser,
  onLogout: resetApp,
}

class HomeScreen extends Component {

  componentWillMount() {
    const { uid, token } = this.props
    this.props.onFetchUser(uid, token)
    this.props.onFetchProjectsFromUser(uid, token)
  }

  render() {


    const { authError, uid } = this.props
    const username = 'John DOe'
    const projects = [
      { id: 1, name: "p1" },
      { id: 2, name: "p2" },
    ]

    const mappedProjects = projects.map(p =>
      <li key={p.id}>{p.name}</li>
    )
    const mockProject = { name: "MOCK PROJECT" }

    return (
      authError ? this.props.onLogout() : //TODO test
        <>
          <MuiThemeProvider>
            Hello {username}
            <br />
            Here's a list of your projects:
          <br />
            <ol>{mappedProjects}</ol>
            <br />
            <RaisedButton
              label="Add Project"
              primary={true}
              style={style}
              onClick={() =>
                this.props.onPostProject(uid, mockProject)} />
            <br />
            <RaisedButton
              label="Log out"
              primary={true}
              style={style}
              onClick={() => this.props.onLogout()} />
          </MuiThemeProvider>
        </>
    )
  }

}
const style = {
  margin: 15
}




export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)