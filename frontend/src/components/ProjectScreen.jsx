import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProject } from './../actions/project-actions'
import Button from '@material-ui/core/Button'
import SimpleAppBar from './view/SimpleAppBar'
import SimpleList from './view/SimpleList'
import LogoutButton from './LogoutButton'
import { getProjects } from '../redux-orm/selectors'


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

  render() {
    const { pid, projects } = this.props
    const selectedProject = projects.find(p => p.id === pid)

    console.log(selectedProject)

    return (
      <>
        <SimpleAppBar title="ProjectScreen">
          <LogoutButton />
        </SimpleAppBar>
        {JSON.stringify(selectedProject)}

        <div>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => this.props.closeProjectScreen()}
          >
            Back
          </Button>
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen)