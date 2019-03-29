import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { History } from 'history'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BackButton from '../view/BackButton'
import LoadingScreen from '../view/LoadingScreen'
import LogoutButton from '../view/LogoutButton'
import SimpleAppBar from '../view/SimpleAppBar'
import SimpleList from '../view/SimpleList'
import AddUserButton from './AddMemberButton'
import ProjectStore from '../../stores/ProjectStore'
import { IUser } from '../../stores/model-interfaces'
import { PromiseState } from '../../util/enums'
import { toJS } from 'mobx'
interface InjectedProps {
  projectStore: ProjectStore
  match: any
  history: History
}

@inject('projectStore')
@observer
class ProjectScreen extends Component<any, any> {
  state = {}

  get injected() {
    return this.props as InjectedProps
  }

  handleItemClick = (u: any) => {
    console.log(toJS<IUser>(u))
  }

  handleItemView = (onItemClick: any, u: IUser) => {
    return (
      <ListItem divider button key={u.id} onClick={() => onItemClick(u)}>
        <ListItemText primary={u.name} />
        <ListItemText secondary={u.email} />
        <ListItemText secondary={u.members!.role} />
      </ListItem>
    )
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

        {/* 
        //@ts-ignore */}
        <SimpleList
          items={projectStore.users}
          subheader="Users"
          emptyMessage="No users"
          onItemClick={this.handleItemClick}
          onItemView={this.handleItemView}
        />
        <BackButton callback={this.goBack} />
        <br />
        <br />
        <AddUserButton />

        <Button
          color="primary"
          variant="contained"
          onClick={() => console.log('remove user mock')}
        >
          Remove User
        </Button>
      </>
    )
  }
}

// @ts-ignore
export default withRouter(ProjectScreen)
