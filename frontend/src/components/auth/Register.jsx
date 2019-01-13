import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'

import { register } from '../../actions/auth-actions'
import SimpleAppBar from '../view/SimpleAppBar';


const mapStateToProps = (state) => ({
  fetching: state.auth.fetching,
  fetched: state.auth.fetched,
})

const mapDispatch = {
  onRegister: register,
}

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(event) {
    let { username, email, password } = this.state
    let { onRegister } = this.props
    let credentials = { username, email, password }
    onRegister(credentials)
  }

  handleKey(e) {
    if (e.key === "Enter") {
      this.handleClick()
    }
  }

  render() {
    return (
      <>
        <SimpleAppBar title="Register" />
        <TextField
          placeholder="Username"
          onChange={e => this.handleChange(e)}
          onKeyDown={e => this.handleKey(e)}
          name="username"
        />
        <br />
        <TextField
          placeholder="Email"
          type="email"
          onChange={e => this.handleChange(e)}
          onKeyDown={e => this.handleKey(e)}
          name="email"
        />
        <br />
        <TextField
          placeholder="Password"
          type="password"
          onChange={e => this.handleChange(e)}
          onKeyDown={e => this.handleKey(e)}
          name="password"
        />
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={e => this.handleClick(e)}
        >
          Submit
        </Button>
      </>
    )
  }
}


export default connect(mapStateToProps, mapDispatch)(Register)