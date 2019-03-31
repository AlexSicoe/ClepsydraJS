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
import KanbanBoard from './KanbanBoard'
import MemberList from './MemberList'
import { IDrawerItem } from '../view/MyDrawer'
interface IInjectedProps {
  projectStore: ProjectStore
  match: any
  history: History
}

@inject('projectStore')
@observer
class ProjectScreen extends Component<any, any> {
  drawerItems: IDrawerItem[] = [
    {
      text: 'Kanban Board',
      iconType: 'Dashboard',
      handleClick: () => console.log('Redirect to Kanban board')
    },
    {
      text: 'Members',
      iconType: 'People',
      handleClick: () => console.log('Redirect to Member list')
    },
    {
      text: 'Settings',
      iconType: 'Settings',
      handleClick: () => console.log('Redirect to Settings')
    }
  ]

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

    // console.log('STAGES', toJS<IStage[]>(projectStore.stages))

    return (
      <>
        <SimpleAppBar title={projectStore.name} drawerItems={this.drawerItems}>
          <LogoutButton />
        </SimpleAppBar>

        <MemberList users={projectStore.users} />
        <KanbanBoard />

        <BackButton callback={this.goBack} />
      </>
    )
  }
}

// @ts-ignore
export default withRouter(ProjectScreen)
