import Button from '@material-ui/core/Button'
import { History } from 'history'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthStore from '../../stores/AuthStore'

interface IProps {}

interface IInjectedProps {
  authStore: AuthStore
  history: History
}

interface IState {}

@inject('authStore')
@observer
class LogoutButton extends Component<IProps, IState> {
  get injected() {
    return this.props as IInjectedProps
  }

  render() {
    const { authStore, history } = this.injected
    return (
      <>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => authStore.logout(() => history.push('/'))}
        >
          Logout
        </Button>
      </>
    )
  }
}

// @ts-ignore
export default withRouter(LogoutButton)
