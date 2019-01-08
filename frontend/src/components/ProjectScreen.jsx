import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProject, addUserToProject } from './../actions/project-actions'
import Button from '@material-ui/core/Button'
import SimpleAppBar from './view/SimpleAppBar'
import SimpleList from './view/SimpleList'
import LogoutButton from './LogoutButton'
import { getProjects } from '../redux-orm/selectors'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import BackButton from './view/BackButton';
import AddUserForm from './AddUserForm';



const mapStateToProps = (state) => ({
  token: state.auth.token,
  pid: state.project.selected,
  projects: getProjects(state),
})

const mapDispatchToProps = {
  onFetchProject: fetchProject,
  onAddUserToProject: addUserToProject
}

class ProjectScreen extends Component {

  handleFetch() {
    const { pid, token, onFetchProject } = this.props
    onFetchProject(pid, token)
  }

  componentDidMount() {
    this.handleFetch()
  }

  componentDidUpdate() {
    // this.handleFetch()
  }

  handleItemClick(u) {
    console.log(u)
  }

  handleItemView(onItemClick, u) {
    return (
      <ListItem
        divider
        button
        key={u.id}
        onClick={() => onItemClick(u)} //
      >
        <ListItemText primary={u.username} />
        <ListItemText secondary={u.email} />
        <ListItemText secondary={u.userProject.role} />
      </ListItem>
    )
  }

  render() {
    const { pid, projects } = this.props
    const selectedProject = projects.find(p => p.id === pid)

    console.log(selectedProject)

    if (!selectedProject)
      return <>Loading project</> //TODO what if it doesn't exist in redux or on server anymore?

    return (
      <>
        <SimpleAppBar title={selectedProject.name}>
          <LogoutButton />
        </SimpleAppBar>


        <SimpleList
          items={selectedProject.users}
          subheader="Users"
          emptyMessage="No users"
          onItemClick={(u) => this.handleItemClick(u)}
          onItemView={(onItemClick, u) => this.handleItemView(onItemClick, u)}
        />
        <BackButton callback={() => this.props.closeProjectScreen()} />
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


class AddUserButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showUserForm: false,
    }
  }

  openUserForm() {
    this.setState({ showUserForm: true })
  }

  closeUserForm() {
    this.setState({ showUserForm: false })
  }

  render() {
    const { showUserForm } = this.state

    if (showUserForm)
      return <AddUserForm closeForm={this.closeUserForm.bind(this)} />

    return (
      <Button
        color="primary"
        variant="contained"
        onClick={() => this.openUserForm()}
      >
        Add User
      </Button>
    )
  }
}