import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import AuthStore from '../../mobx/stores/AuthStore';
import ProjectStore from '../../mobx/stores/ProjectStore';
import ConfirmDialog from '../view/ConfirmDialog';
import { ChangeEvent, KeyEvent } from '../view/view-types';


interface Props {

}

interface InjectedProps extends Props {
  authStore: AuthStore
  projectStore: ProjectStore
  history: History
}

interface State {

}

@inject('authStore', 'projectStore')
@observer
class AddUserButton extends Component<Props, State> {
  state = {
    open: false,
    mailOrName: '',
  }

  get injected() {
    return this.props as InjectedProps
  }

  handleChange = (event: ChangeEvent) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOK = () => {
    const { mailOrName } = this.state
    const { authStore, projectStore } = this.injected
    const { token } = authStore

    projectStore.addUserToProject(projectStore.id, { mailOrName }, token)
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
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleOpen}
        >
          Add User
        </Button>
        <ConfirmDialog
          open={open}
          title="Add User"
          content="Invite a user into this project"
          handleOK={this.handleOK}
          handleClose={this.handleClose}
        >
          <TextField
            name="mailOrName"
            placeholder="Username or mail address"
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

export default AddUserButton