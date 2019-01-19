
import React from 'react'
import { resetApp } from '../../actions/root-actions'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';

const mapDispatchToProps = {
  onLogout: resetApp,
}

function LogoutButton(props: any) {
  return (
    <>
      <Button

        color="secondary"
        variant="contained"
        onClick={() => props.onLogout()}
      >
        Logout
      </Button>
    </>
  )
}

export default connect(null, mapDispatchToProps)(LogoutButton)