import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthStore from '../../mobx/stores/AuthStore';
import ConfirmDialog from '../view/ConfirmDialog';
import { ChangeEvent, KeyEvent } from '../view/view-types';
import { History } from 'history';



const styles = (theme: any) => ({
  buttonMargin: {
    margin: '5px'
  }
})



interface InjectedProps {
  authStore: AuthStore
  history: History
  classes: any
}

interface IState {
  open: boolean
  username: string
  password: string
}


@inject('authStore')
@observer
class LoginDialog extends Component<any, IState> {
  state = {
    open: false,
    username: '',
    password: '',
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

  handleLogin = () => {
    const { username, password } = this.state
    const { authStore, history } = this.injected
    const credentials = { username, password }
    authStore.login(credentials, () => history.push('/home'))
  }

  handleKey = (event: KeyEvent) => {
    if (event.key === "Enter") {
      this.handleLogin()
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
          Login
        </Button>
        <ConfirmDialog
          open={open}
          title="Login"
          content="Please enter your credentials"
          handleOK={this.handleLogin}
          handleClose={this.handleClose}
        >
          <TextField
            placeholder="Username"
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
            name="username"
            margin="dense"
            fullWidth
            autoFocus
          />
          <br />
          <TextField
            type="Password"
            placeholder="Password"
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

// @ts-ignore
const LoginDialogWithRouter = withRouter(LoginDialog)
export default withStyles(styles)(LoginDialogWithRouter)