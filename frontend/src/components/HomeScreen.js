import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { logout } from '../actions/user-actions'
import { postProject, getProject, getProjectsOfUser } from '../actions/project-actions'

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    uid: state.user.uid,

    email: state.user.email,
    token: state.user.token,
    error: state.user.error,
    fetching: state.user.fetching,
    fetched: state.user.fetched,
    message: state.user.message,

    projects: state.projects.projects

  }
}

const mapDispatch = {
  onPostProject: postProject,
  onGetProject: getProject,
  onGetProjectsOfUser: getProjectsOfUser,
  onLogout: logout,
}

class HomeScreen extends Component {
  render() {
    const { username, uid, token, projects } = this.props
    // const projects = [
    //   { id: 1, name: "p1" },
    //   { id: 2, name: "p2" },
    // ]
    this.props.onGetProjectsOfUser(uid, token)
    const mappedProjects = projects.map(p =>
      <li key={p.id}>{p.name}</li>
    )
    const mockProject = { name: "MOCK PROJECT" }

    return (
      <>
        <Router>

        </Router>

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




export default connect(mapStateToProps, mapDispatch)(HomeScreen)