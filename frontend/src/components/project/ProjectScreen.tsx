import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProject, addUserToProject } from '../../actions/project-actions'
import Button from '@material-ui/core/Button'
import SimpleAppBar from '../view/SimpleAppBar'
import SimpleList from '../view/SimpleList'
import LogoutButton from '../view/LogoutButton'
import { getProjects } from '../../redux-orm/selectors'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import BackButton from '../view/BackButton';
import AddUserButton from './AddUserButton';
import LoadingScreen from '../view/LoadingScreen';



const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  pid: state.project.selected,
  projects: getProjects(state),
})

const mapDispatchToProps = {
  onFetchProject: fetchProject,
  onAddUserToProject: addUserToProject
}

class ProjectScreen extends Component<any, any> {
  state = {

  }

  handleFetch() {
    const { pid, token, onFetchProject } = this.props
    onFetchProject(pid, token)
  }

  componentDidMount() {
    this.handleFetch()
  }

  handleItemClick(u: any) {
    console.log(u)
  }

  handleItemView(onItemClick: any, u: any) {
    return (
      <ListItem
        divider
        button
        key={u.id}
        onClick={() => onItemClick(u)}
      >
        <ListItemText primary={u.username} />
        <ListItemText secondary={u.email} />
        <ListItemText secondary={u.userProject.role} />
      </ListItem>
    )
  }

  render() {
    const { pid, projects, closeProjectScreen } = this.props
    const selectedProject = projects.find((p: any) => p.id === pid)

    console.log(selectedProject)

    if (!selectedProject)
      return (
        <LoadingScreen>
          <BackButton callback={() => closeProjectScreen()} />
        </LoadingScreen>
      )


    return (
      <>
        <SimpleAppBar title={selectedProject.name}>
          <LogoutButton />
        </SimpleAppBar>

        {/* 
        //@ts-ignore */}
        <SimpleList
          items={selectedProject.users}
          subheader="Users"
          emptyMessage="No users"
          onItemClick={(u: any) => this.handleItemClick(u)}
          onItemView={(onItemClick: any, u: any) => this.handleItemView(onItemClick, u)}
        />
        <BackButton callback={() => closeProjectScreen()} />
        <br />
        <br />
        <AddUserButton />

        <Button //TODO pune X la fiecare user
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)