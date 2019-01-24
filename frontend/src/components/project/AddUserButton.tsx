import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserToProject } from '../../actions/project-actions';
import ConfirmDialog from '../view/ConfirmDialog';
import { ChangeEvent, KeyEvent } from '../view/view-types';

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
})

const mapDispatchToProps = {
  onAddUserToProject: addUserToProject
}

class AddUserForm extends Component<any, any> {
  state = {
    open: false,
    mailOrName: '',
  }

  handleChange = (event: ChangeEvent) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOK = () => {
    const { mailOrName } = this.state
    const { pid, token, onAddUserToProject } = this.props

    this.handleClose()
    onAddUserToProject(pid, mailOrName, token)
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm)