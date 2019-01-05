import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { getUsers } from '../redux-orm/selectors'

import LogoutButton from './LogoutButton'
import { fetchUser } from '../actions/user-actions'
import { resetApp } from '../actions/root-actions'
import SimpleAppBar from './view/SimpleAppBar'
import SimpleList from './view/SimpleList'
import { selectProject } from './../actions/project-actions'
import ProjectScreen from './ProjectScreen'
import ProjectForm from './ProjectForm'
import { basicStyle, borderStyle } from './styles/styles'

import socketIOClient from 'socket.io-client'

const mapStateToProps = (state) => ({
  token: state.auth.token,
  authError: state.auth.error, //if this exists, reset app
  authId: state.auth.authId,
  users: getUsers(state),
})

const mapDispatchToProps = {
  onFetchUser: fetchUser,
  onLogout: resetApp,
  onSelectProject: selectProject
}


class HomeScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showProjectScreen: false,
    }
  }


  componentWillMount() {
    const { authId, token, onLogout } = this.props
    if (!token) { onLogout() }
    else {
      this.props.onFetchUser(authId, token)
    }
  }

  handleItemClick(p) {
    const { onSelectProject } = this.props
    onSelectProject(p.id)
    this.setState({ showProjectScreen: true })
  }

  closeProjectScreen() {
    this.setState({ showProjectScreen: false })
  }

  render() {
    const { authId, users } = this.props
    const localUser = users.find(user => user.id === authId)
    const { showProjectScreen } = this.state

    if (!localUser) //TODO, await fetching
      return <></>

    if (showProjectScreen)
      return <ProjectScreen closeProjectScreen={this.closeProjectScreen.bind(this)} />



    return (
      <>
        <SimpleAppBar title="Home">
          <LogoutButton />
        </SimpleAppBar>

        Hello {localUser.username}!
          <br />
        <div style={{ ...basicStyle, ...borderStyle }}>
          <SimpleList
            items={localUser.projects}
            subheader="Project List"
            emptyMessage="You have no projects. Please create one"
            onItemClick={(p) => this.handleItemClick(p)}
          />
        </div>
        <div style={basicStyle}>
          <AddProjectButton />
        </div>
        <div>
          <UFO authId={authId} />
        </div>
        <br />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)


class AddProjectButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showProjectForm: false,
    }
  }

  handleButton() {
    this.setState({ showProjectForm: true })
  }

  closeProjectForm() {
    this.setState({ showProjectForm: false })
  }

  render() {
    const { showProjectForm } = this.state

    if (showProjectForm)
      return <ProjectForm closeProjectForm={this.closeProjectForm.bind(this)} />

    return (
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.handleButton()}
        >
          Add Project
          </Button>
      </div>
    )
  }
}


class UFO extends Component {
  constructor(props) {
    super(props)

    this.state = {
      response: null,
    }
  }


  componentDidMount() {
    const path = 'http://localhost:4000'
    const { authId } = this.props
    const socket = socketIOClient(path)
    // socket.emit('req/user/read', authId)
    socket.emit('storeClientInfo', authId)
    socket.on('userFetched', data => this.setState({ response: data }))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {JSON.stringify(this.state)}
      </div>
    )
  }
}
