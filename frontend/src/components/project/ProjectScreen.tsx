import { History } from 'history'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ProjectStore from '../../stores/ProjectStore'
import { PromiseState } from '../../util/enums'
import BackButton from '../view/BackButton'
import LoadingScreen from '../view/LoadingScreen'
import LogoutButton from '../view/LogoutButton'
import { IDrawerItem } from '../view/MyDrawer'
import SimpleAppBar from '../view/SimpleAppBar'
import ChartFragment from './ChartFragment'
import KanbanBoard from './KanbanBoard'
import MemberList from './MemberList'

enum Fragment {
  KanbanBoard = 'KanbanBoard',
  Chart = 'Chart',
  MemberList = 'MemberList',
  Settings = 'Settings'
}
interface IProps {}
interface IInjectedProps extends IProps {
  projectStore: ProjectStore
  match: any
  history: History
}

interface IState {
  fragment: Fragment
}

@inject('projectStore')
@observer
class ProjectScreen extends Component<IProps, IState> {
  state = {
    fragment: Fragment.KanbanBoard
  }

  drawerItems: IDrawerItem[] = [
    {
      text: 'Kanban Board',
      iconType: 'Dashboard',
      handleClick: () => this.setState({ fragment: Fragment.KanbanBoard })
    },
    {
      text: 'Members',
      iconType: 'People',
      handleClick: () => this.setState({ fragment: Fragment.MemberList })
    },
    {
      text: 'Charts',
      iconType: 'Chart',
      handleClick: () => this.setState({ fragment: Fragment.Chart })
    },
    {
      text: 'Settings',
      iconType: 'Settings',
      handleClick: () => this.setState({ fragment: Fragment.Settings })
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

  renderFragment = () => {
    const { fragment } = this.state
    const { projectStore } = this.injected

    switch (fragment) {
      case Fragment.KanbanBoard:
        return <KanbanBoard projectStore={projectStore} />
      case Fragment.MemberList:
        return <MemberList users={projectStore.users} />
      case Fragment.Chart:
        return <ChartFragment projectStore={projectStore} />
      case Fragment.Settings:
        console.warn('Settings component not implemented!')
        break
      default:
        console.warn('Fragment case not implemented!')
    }
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
          <BackButton callback={this.goBack} />
          <LogoutButton />
        </SimpleAppBar>

        {this.renderFragment()}
      </>
    )
  }
}

// @ts-ignore
export default withRouter(ProjectScreen)
