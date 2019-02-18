import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import ConfirmDialog from '../view/ConfirmDialog'
import { ChangeEvent, KeyEvent } from '../view/view-types'
import ProjectStore from '../../stores/ProjectStore'

interface InjectedProps {
  projectStore: ProjectStore
}

interface IState {
  open: boolean
  name: string
}

@inject('projectStore')
@observer
class AddProjectButton extends Component<any, IState> {
  state = {
    open: false,
    name: ''
  }

  get injected() {
    return this.props as InjectedProps
  }

  handleChange = (event: ChangeEvent) => {
    // @ts-ignore
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOK = () => {
    const { name } = this.state
    const { projectStore } = this.injected

    const project = { name }
    projectStore.create(project)
    this.handleClose()
  }

  handleKey = (event: KeyEvent) => {
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
        <Button color="primary" variant="contained" onClick={this.handleOpen}>
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
            name="name"
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

export default AddProjectButton
