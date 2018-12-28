import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { getUsers } from '../redux-orm/selectors'

import LogoutButton from './LogoutButton'
import { fetchProjectsFromUser } from '../actions/project-actions'
import { fetchUser } from '../actions/user-actions'
import { resetApp } from '../actions/root-actions'
import SimpleAppBar from './view/SimpleAppBar'
import SimpleList from './view/SimpleList'

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
          <SimpleList
            items={localUser.projects}
            subheader="Project List"
            emptyMessage="You have no projects. Please create one"
            onClickItem={(item) => console.log(item.id)}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)