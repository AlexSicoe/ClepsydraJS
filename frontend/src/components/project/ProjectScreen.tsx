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
import AddUserButton from './AddUserButton'
import ProjectStore from '../../stores/ProjectStore'

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
    console.log(u)
  }

  handleItemView = (onItemClick: any, u: any) => {
    return (
      <ListItem divider button key={u.id} onClick={() => onItemClick(u)}>
        <ListItemText primary={u.name} />
        <ListItemText secondary={u.email} />
        <ListItemText secondary={u.member.role} />
      </ListItem>
    )
  }

  goBack = () => this.injected.history.goBack()

  handleFetch = () => {
    const { projectStore, match } = this.injected
    const { pid } = match.params
    projectStore.get(pid)
  }

  componentWillMount() {
    this.handleFetch()
  }

  render() {
    const { match, projectStore } = this.injected
    const { pid } = match.params

    if (projectStore.state === 'pending') {
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

        <Button // TODO pune X la fiecare user
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
