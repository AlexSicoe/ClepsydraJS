import { History } from 'history'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ProjectStore from '../../stores/ProjectStore'
import { PromiseState } from '../../util/enums'
import BackButton from '../view/BackButton'
import LoadingScreen from '../view/LoadingScreen'
import LogoutButton from '../view/LogoutButton'
import SimpleAppBar from '../view/SimpleAppBar'
import MemberList from './MemberList'
interface IInjectedProps {
  projectStore: ProjectStore
  match: any
  history: History
}

@inject('projectStore')
@observer
class ProjectScreen extends Component<any, any> {
  get injected() {
    return this.props as IInjectedProps
  }

  goBack = () => this.injected.history.goBack()

  handleFetch = () => {
    const { projectStore, match } = this.injected
    const { projectId } = match.params
    projectStore.get(projectId)
  }

  componentWillMount() {
    this.handleFetch()
  }

  render() {
    const { projectStore } = this.injected

    if (projectStore.state === PromiseState.PENDING) {
      return (
        <LoadingScreen>
          <BackButton callback={this.goBack} />
        </LoadingScreen>
      )
    }

    return (
      <>
        <SimpleAppBar title={projectStore.name}>
          <LogoutButton />
        </SimpleAppBar>

        <MemberList users={projectStore.users} />

        <BackButton callback={this.goBack} />
      </>
    )
  }
}

// @ts-ignore
export default withRouter(ProjectScreen)
