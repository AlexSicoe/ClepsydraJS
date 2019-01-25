
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { inject, observer } from 'mobx-react';
import AuthStore from '../../mobx/stores/AuthStore';

interface Props {

}

interface InjectedProps {
  authStore: AuthStore
}

interface State {

}

@inject('authStore')
@observer
class LogoutButton extends Component<Props, State> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { authStore } = this.injected
    return (
      <>
        <Button

          color="secondary"
          variant="contained"
          onClick={authStore.reset}
        >
          Logout
      </Button>
      </>
    )
  }
}

export default LogoutButton