import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth-actions';
import ConfirmDialog from '../view/ConfirmDialog';
import { ChangeEvent, KeyEvent } from '../view/view-types';



const styles = (theme: any) => ({
  buttonMargin: {
    margin: '5px'
  }
})

const mapStateToProps = (state: any) => ({
  fetching: state.auth.fetching,
  fetched: state.auth.fetched,
})

const mapDispatch = {
  register,
}

class SignUpDialog extends Component<any, any> {
  state = {
    open: false,
    username: '',
    email: '',
    password: '',
  }


  handleChange = (event: ChangeEvent) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignUp = () => {
    let { username, email, password } = this.state
    let { register } = this.props
    let credentials = { username, email, password }
    register(credentials)
  }

  handleKey = (event: KeyEvent) => {
    if (event.key === "Enter") {
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

const SignUpDialogWithStyles = withStyles(styles)(SignUpDialog)
export default connect(mapStateToProps, mapDispatch)(SignUpDialogWithStyles)