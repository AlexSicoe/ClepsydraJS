import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { postProject } from '../../actions/project-actions'
import ConfirmDialog from '../view/ConfirmDialog';
import Button from '@material-ui/core/Button';
import { ChangeEvent, KeyboardEvent } from '../view/viewTypes';


const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  uid: state.auth.uid,
})

const mapDispatchToProps = {
  onPostProject: postProject
}

class ProjectForm extends Component<any, any> {
  state = {
    open: false,
    projectName: '',
  }

  handleChange = (event: ChangeEvent) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOK = () => {
    const { projectName } = this.state
    const { token, uid, onPostProject } = this.props

    const project = { name: projectName }
    this.handleClose()
    onPostProject(uid, project, token)
  }

  handleKey = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        this.handleClose()
        break
      case 'Enter':
        this.handleOK()
        break
      default:
        break
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { open } = this.state

    return (
      <>
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleOpen}
        >
          Add Project
        </Button>
        <ConfirmDialog
          open={open}
          title="Add Project"
          content="Enter a name for your project"
          handleOK={this.handleOK}
          handleClose={this.handleClose}
        >
          <TextField
            name="projectName"
            placeholder="Project Name"
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
            margin="dense"
            fullWidth
            autoFocus
          />
        </ConfirmDialog>
      </>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm)