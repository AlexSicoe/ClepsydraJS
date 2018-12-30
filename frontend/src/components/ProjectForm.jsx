import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import SimpleAppBar from './view/SimpleAppBar'
import LogoutButton from './LogoutButton'
import TextField from '@material-ui/core/TextField';

export default class ProjectDetails extends Component {
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


  render() {
    return (
      <>
        <SimpleAppBar title="Project Form">
          <LogoutButton />
        </SimpleAppBar>
        <TextField
          placeholder="Project Name"
          onChange={(event) => this.handleChange(event)}
          name="projectName"
        />
        <br />
        <br />
        <div>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => this.props.closeProjectForm()}
          >
            Cancel
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={() => console.log(this.state)}
          >
            OK
          </Button>
        </div>
      </>
    )
  }
}
