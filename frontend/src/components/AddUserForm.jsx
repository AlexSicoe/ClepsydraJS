import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { addUserToProject } from '../actions/project-actions'

const mapStateToProps = (state) => ({
  token: state.auth.token,
  pid: state.project.selected,
})

const mapDispatchToProps = {
  onAddUserToProject: addUserToProject
}

class AddUserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mailOrName: '',
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOK() {
    const { mailOrName } = this.state
    const { pid, token, closeForm, onAddUserToProject } = this.props

    onAddUserToProject(pid, mailOrName, token)
    closeForm()
  }

  render() {
    const { closeForm } = this.props

    return (
      <>
        <TextField
          placeholder="Username or mail address"
          onChange={(event) => this.handleChange(event)}
          name="mailOrName"
        />
        <br />
        <br />
        <div>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => closeForm()}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm)