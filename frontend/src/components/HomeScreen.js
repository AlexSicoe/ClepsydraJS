import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { logout } from '../actions/user-actions'
import { postProject } from '../actions/project-actions'

const mapStateToProps = (state) => {
  let { username, email, token,
    error, fetching, fetched,
    message } = state.user
  return {
    username, email, token,
    error, fetching, fetched,
    message
  }
}

const mapDispatch = {
  onPostProject: postProject,
  onLogout: logout,
}

class HomeScreen extends Component {
  render() {
    return (
      <>
        <Router>

        </Router>

        <MuiThemeProvider>
          Hello {this.props.username}
          <br />
          Here's a list of your projects
          <br />
          {}
          <br />
          <RaisedButton
            label="Add Project"
            primary={true}
            style={style}
            onClick={() => this.props.onPostProject()} />
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