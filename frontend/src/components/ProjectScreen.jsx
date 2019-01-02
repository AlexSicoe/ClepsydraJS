import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProject } from './../actions/project-actions'
import Button from '@material-ui/core/Button'
import SimpleAppBar from './view/SimpleAppBar'
import SimpleList from './view/SimpleList'
import LogoutButton from './LogoutButton'
import { getProjects } from '../redux-orm/selectors'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'


const mapStateToProps = (state) => ({
  token: state.auth.token,
  pid: state.project.selected,
  projects: getProjects(state),
})

const mapDispatchToProps = {
  onFetchProject: fetchProject
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
          subheader=""
          emptyMessage="No users"
          onItemClick={(u) => this.handleItemClick(u)}
          onItemView={(onItemClick, u) => this.handleItemView(onItemClick, u)}
        />
        <Button
          color="secondary"
          variant="contained"
          onClick={() => this.props.closeProjectScreen()}
        >
          Back
          </Button>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)