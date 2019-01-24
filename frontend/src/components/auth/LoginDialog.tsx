import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/auth-actions';
import ConfirmDialog from '../view/ConfirmDialog';
import { ChangeEvent, KeyEvent } from '../view/view-types';



const styles = (theme: any) => ({
  buttonMargin: {
    margin: '5px'
  }
})

const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  fetching: state.auth.fetching,
  fetched: state.auth.fetched,
})

const mapDispatchToProps = {
  login,
}





class LoginDialog extends Component<any, any> {
  state = {
    open: false,
    username: '',
    password: '',
  }

  handleChange = (event: ChangeEvent) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = () => {
    let { username, password } = this.state
    let { login, history } = this.props
    let credentials = { username, password }
    login(credentials, () => history.push('/home'))
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
    const { classes } = this.props
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

const LoginDialogWithRouter = withRouter(LoginDialog)
const LoginDialogWithStyles = withStyles(styles)(LoginDialogWithRouter)
export default connect(mapStateToProps, mapDispatchToProps)(LoginDialogWithStyles)