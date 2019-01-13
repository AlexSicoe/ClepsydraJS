import React, { Component } from 'react'
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

  handleKey(e) {
    const { closeForm } = this.props

    switch (e.key) {
      case 'Escape':
        closeForm()
        break
      case 'Enter':
        this.handleOK()
        break
      default:
        break
    }
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
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleKey(e)}
            name="mailOrName"
          />
        </ConfirmForm>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm)