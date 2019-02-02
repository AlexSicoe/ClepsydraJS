import { History } from 'history'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthStore from '../../mobx/stores/AuthStore'
import UserStore from '../../mobx/stores/UserStore'
import { basicStyle, borderStyle } from '../styles/styles'
import LoadingScreen from '../view/LoadingScreen'
import LogoutButton from '../view/LogoutButton'
import SimpleAppBar from '../view/SimpleAppBar'
import SimpleList from '../view/SimpleList'
import AddProjectButton from './AddProjectButton'

interface InjectedProps {
  authStore: AuthStore
  userStore: UserStore
  history: History
}

@inject('authStore', 'userStore')
@observer
class HomeScreen extends Component<any, any> {
  get injected() {
    return this.props as InjectedProps
  }

  componentWillMount() {
    const { authStore, userStore } = this.injected
    const { uid, token } = authStore
    if (!authStore.isAuthenticated) {
      authStore.logout()
    } else {
      userStore.fetchUser(uid, token)
    }
  }

  redirectToProject = (p: any) => {
    const { history } = this.injected
    history.push(`/projects/${p.id}`)
  }

  render() {
    const { userStore } = this.injected

    if (userStore.state === 'pending') {
      return <LoadingScreen />
    }

    return (
      <>
        <SimpleAppBar title="Home">
          <LogoutButton />
        </SimpleAppBar>
        Hello {userStore.username}!
        <br />
        <div style={{ ...basicStyle, ...borderStyle }}>
          {/* 
        //@ts-ignore */}
          <SimpleList
            items={userStore.projects}
            subheader="Project List"
            emptyMessage="You have no projects. Please create one"
            onItemClick={this.redirectToProject}
          />
        </div>
        <div style={basicStyle}>
          <AddProjectButton />
        </div>
        <br />
      </>
    )
  }
}

// @ts-ignore
export default withRouter(HomeScreen)
