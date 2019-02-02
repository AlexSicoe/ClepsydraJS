import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import AuthStore from '../../mobx/stores/AuthStore'
import ConfirmDialog from '../view/ConfirmDialog'
import { ChangeEvent, KeyEvent } from '../view/view-types'

const styles = (theme: any) => ({
  buttonMargin: {
    margin: '5px'
  }
})

interface InjectedProps {
  authStore: AuthStore
  classes: any
}

interface IState {
  open: boolean
  username: string
  email: string
  password: string
}

@inject('authStore')
@observer
class SignUpDialog extends Component<any, IState> {
  state = {
    open: false,
    username: '',
    email: '',
    password: ''
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

  handleSignUp = () => {
    const { username, email, password } = this.state
    const { authStore } = this.injected
    const credentials = { username, email, password }
    authStore!.signUp(credentials)
  }

  handleKey = (event: KeyEvent) => {
    if (event.key === 'Enter') {
      this.handleSignUp()
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
    const { classes } = this.injected
    const { open } = this.state

    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonMargin}
          onClick={this.handleOpen}
        >
          Sign Up
        </Button>
        <ConfirmDialog
          open={open}
          title="Sign Up"
          content="Please enter your credentials"
          handleOK={this.handleSignUp}
          handleClose={this.handleClose}
        >
          <TextField
            placeholder="Username"
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
            name="username"
          />
          <br />
          <TextField
            placeholder="Email"
            type="email"
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
            name="email"
            margin="dense"
            fullWidth
            autoFocus
          />
          <br />
          <TextField
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
            name="password"
            margin="dense"
            fullWidth
          />
        </ConfirmDialog>
      </>
    )
  }
}

export default withStyles(styles)(SignUpDialog)
