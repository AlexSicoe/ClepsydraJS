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
import { withRouter } from 'react-router-dom';



const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  projects: getProjects(state),
})

const mapDispatchToProps = {
  fetchProject,
  addUserToProject
}

class ProjectScreen extends Component<any, any> {
  state = {

  }

  handleFetch = () => {
    const { match, token, fetchProject } = this.props
    const { pid } = match.params
    fetchProject(pid, token)
  }


  handleItemClick = (u: any) => {
    console.log(u)
  }

  handleItemView = (onItemClick: any, u: any) => {
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

  goBack = () => this.props.history.goBack()

  componentWillMount() {
    this.handleFetch()
  }

  render() {
    const { match, projects } = this.props
    const { pid } = match.params
    const selectedProject = projects.find((p: any) => p.id == pid)

    console.log(selectedProject)

    if (!selectedProject)
      return (
        <LoadingScreen>
          <BackButton callback={this.goBack} />
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
          onItemClick={this.handleItemClick}
          onItemView={this.handleItemView}
        />
        <BackButton callback={this.goBack} />
        <br />
        <br />
        <AddUserButton pid={pid} />

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

const ProjectScreenWithRouter = withRouter(ProjectScreen)
export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreenWithRouter)