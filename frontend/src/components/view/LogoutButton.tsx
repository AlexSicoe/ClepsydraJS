import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { inject, observer } from 'mobx-react'
import AuthStore from '../../stores/AuthStore'

interface IProps {}

interface IInjectedProps {
  authStore: AuthStore
}

interface IState {}

@inject('authStore')
@observer
class LogoutButton extends Component<IProps, IState> {
  get injected() {
    return this.props as IInjectedProps
  }

  render() {
    const { authStore } = this.injected
    return (
      <>
        <Button
          color="secondary"
          variant="contained"
          onClick={authStore.logout}
        >
          Logout
        </Button>
      </>
    )
  }
}

export default LogoutButton
