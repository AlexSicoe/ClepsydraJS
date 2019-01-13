import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import { postProject } from './../actions/project-actions'
import ConfirmForm from './view/ConfirmForm'


const mapStateToProps = (state) => ({
  token: state.auth.token,
  uid: state.auth.uid,
})

const mapDispatchToProps = {
  onPostProject: postProject
}

class ProjectForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projectName: '',
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOK() {
    const { projectName } = this.state
    const { token, uid, closeForm, onPostProject } = this.props

    const project = { name: projectName }
    onPostProject(uid, project, token)
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
            placeholder="Project Name"
            onChange={e => this.handleChange(e)}
            onKeyDown={e => this.handleKey(e)}
            name="projectName"
          />
        </ConfirmForm>
      </>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm)