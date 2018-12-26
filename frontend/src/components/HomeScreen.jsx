import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { getUsers } from '../redux-orm/selectors'
import { PropTypes } from 'prop-types'

import LogoutButton from './LogoutButton'
import { fetchProjectsFromUser } from '../actions/project-actions'
import { fetchUser } from '../actions/user-actions'
import { resetApp } from '../actions/root-actions'
import styles from '../material-styles'
import SimpleAppBar from './dumb/SimpleAppBar';

const mapStateToProps = (state) => ({
  token: state.auth.token,
  authError: state.auth.error, //if this exists, reset app
  uid: state.auth.uid,
  users: getUsers(state),
})

const mapDispatchToProps = {
  onFetchUser: fetchUser,
  onFetchProjectsFromUser: fetchProjectsFromUser,
  onLogout: resetApp
}

class HomeScreen extends Component {

  componentWillMount() {
    const { uid, token, onLogout } = this.props
    if (!token) { onLogout() }
    else {
      this.props.onFetchUser(uid, token)
      // this.props.onFetchProjectsFromUser(uid, token)
    }
  }

  render() {
    const { uid, users } = this.props
    const localUser = users.find(user => user.id === uid)

    return (
      localUser ? //TODO, await fetching
        <>
          <SimpleAppBar title="Home">
            <LogoutButton />
          </SimpleAppBar>

          Hello {localUser.username}!
            <br />
          Here's a list of your projects:
            <br />
          <ListView projects={localUser.projects} />
          <br />
          <Button
            color="primary"
            variant="contained"
          // onClick={() =>
          //   this.props.onPostProject(uid, mockProject)
          //   } 
          >
            Add Project
          </Button>
          <br />
        </>
        : <></>
    )
  }
}



const reduxContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
export default withStyles(styles)(reduxContainer)

function ListView({ projects }) {

  ListView.propTypes = {
    projects: PropTypes.array
  }

  return (
    <>
      {
        projects.length ?
          <ListViewMap projects={projects} /> :
          'You don\'t have any projects!'
      }
    </>
  )
}

function ListViewMap({ projects }) {
  const mappedProjects = projects.map(p =>
    <li key={p.id}>{p.name}</li>)

  return (
    <div className='listView'>
      <ul>{mappedProjects}</ul>
    </div>
  )
}
