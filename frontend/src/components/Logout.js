
import React from 'react'
import { resetApp } from '../actions/root-actions'
import Button from 'material-ui/RaisedButton'
import { connect } from 'react-redux';

const mapDispatchToProps = {
  onLogout: resetApp,
}

function Logout(props) {
  return (
    <>
      <Button
        label="Log out"
        primary={true}
        style={style}
        onClick={() => props.onLogout()} />
    </>
  )
}

const style = {
  margin: 15
}

export default connect(null, mapDispatchToProps)(Logout)