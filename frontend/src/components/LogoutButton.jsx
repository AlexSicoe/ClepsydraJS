
import React from 'react'
import { resetApp } from '../actions/root-actions'
import Button from 'material-ui/RaisedButton'
import { connect } from 'react-redux';

const mapDispatchToProps = {
  onLogout: resetApp,
}

function LogoutButton(props) {
  return (
    <>
      <Button
        label="Logout"
        primary={true}
        style={style}
        onClick={() => props.onLogout()} />
    </>
  )
}

const style = {
  margin: 15
}

export default connect(null, mapDispatchToProps)(LogoutButton)