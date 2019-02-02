import React, { Component } from 'react'
import SimpleAppBar from '../view/SimpleAppBar'
import LoginDialog from '../auth/LoginDialog'
import SignUpDialog from '../auth/SignUpDialog'

export default class PublicScreen extends Component {
  render() {
    return (
      <div>
        <SimpleAppBar title="Public Screen">
          <LoginDialog />
          <SignUpDialog />
        </SimpleAppBar>
        This is a public screen...
      </div>
    )
  }
}
