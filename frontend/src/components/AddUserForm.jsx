import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { addUserToProject } from '../actions/project-actions'
import ConfirmForm from './view/ConfirmForm';

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
        <ConfirmForm
          handleOK={() => this.handleOK()}
          handleCancel={() => closeForm()}
        >
          <TextField
            placeholder="Username or mail address"
            onChange={(event) => this.handleChange(event)}
            name="mailOrName"
          />
        </ConfirmForm>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm)