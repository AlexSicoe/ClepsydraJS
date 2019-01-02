import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { postProject } from './../actions/project-actions'


const mapStateToProps = (state) => ({
  token: state.auth.token,
  uid: state.auth.uid,
})

const mapDispatchToProps = {
  onPostProject: postProject
}

class ProjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projectName: '',
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOK() {
    const { projectName } = this.state
    const { token, uid, closeProjectForm, onPostProject } = this.props

    const project = { name: projectName }
    onPostProject(uid, project, token)
    closeProjectForm()
  }

  render() {
    return (
      <>
        <TextField
          placeholder="Project Name"
          onChange={(event) => this.handleChange(event)}
          name="projectName"
        />
        <br />
        <br />
        <div>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => this.props.closeProjectForm()}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={() => this.handleOK()}
          >
            OK
          </Button>
        </div>
      </>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm)