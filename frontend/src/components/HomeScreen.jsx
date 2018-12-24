import React, { Component } from 'react'
import Theme from 'material-ui/styles/MuiThemeProvider'
import Button from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { fetchProjectsFromUser } from '../actions/project-actions'
import { fetchUser } from '../actions/user-actions'
import { getUsers } from '../redux-orm/selectors'
import { PropTypes } from 'prop-types'
import LogoutButton from './LogoutButton'

const mapStateToProps = (state) => ({
  token: state.auth.token,
  authError: state.auth.error, //if this exists, reset app
  uid: state.auth.uid,
  users: getUsers(state),
})

const mapDispatchToProps = {
  onFetchUser: fetchUser,
  onFetchProjectsFromUser: fetchProjectsFromUser,
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
        <Theme>
          <>
            Hello {localUser.username}!
          <br />
            Here's a list of your projects:
            <br />
            <ListView projects={localUser.projects} />
            <br />
            <Button
              label="Add Project"
              primary={true}
              style={style}
            // onClick={() =>
            //   this.props.onPostProject(uid, mockProject)
            //   } 
            />
            <br />
            <LogoutButton />
          </>
        </Theme >
        : <></>
    )
  }
}


const style = {
  margin: 15
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

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
