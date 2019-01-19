import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { getUsers } from '../../redux-orm/selectors'

import LogoutButton from '../view/LogoutButton'
import { fetchUser } from '../../actions/user-actions'
import { resetApp } from '../../actions/root-actions'
import SimpleAppBar from '../view/SimpleAppBar'
import SimpleList from '../view/SimpleList'
import { selectProject } from '../../actions/project-actions'
import ProjectScreen from '../project/ProjectScreen'
import ProjectForm from './ProjectForm'
import { basicStyle, borderStyle } from '../styles/styles'
import LoadingScreen from '../view/LoadingScreen';


const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  authError: state.auth.error, //if this exists, reset app
  uid: state.auth.uid,
  users: getUsers(state),
})

const mapDispatchToProps = {
  onFetchUser: fetchUser,
  onLogout: resetApp,
  onSelectProject: selectProject
}


class HomeScreen extends Component<any, any> {

  constructor(props: any) {
    super(props)

    this.state = {
      showProjectScreen: false,
    }
  }


  componentWillMount() {
    const { uid, token, onLogout } = this.props
    if (!token) { onLogout() }
    else {
      this.props.onFetchUser(uid, token)
    }
  }

  handleItemClick(p: any) {
    const { onSelectProject } = this.props
    onSelectProject(p.id)
    this.setState({ showProjectScreen: true })
  }

  closeProjectScreen() {
    this.setState({ showProjectScreen: false })
  }

  render() {
    const { uid, users } = this.props
    const localUser = users.find((user: any) => user.id === uid)
    const { showProjectScreen } = this.state

    if (!localUser)
      return <LoadingScreen />

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

          {/* 
        //@ts-ignore */}
          <SimpleList
            items={localUser.projects}
            subheader="Project List"
            emptyMessage="You have no projects. Please create one"
            onItemClick={(p: any) => this.handleItemClick(p)}
          />
        </div>

        <div style={basicStyle}>
          <ProjectForm />
        </div>
        <br />
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)