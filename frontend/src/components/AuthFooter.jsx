import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  let { token } = state.auth
  return {
    token,
  }
}

const mapDispatch = {

}


const AuthFooter = (props) => {
  return (!props.token) ?
    (
      <>
        {props.loginMessage}
        <MuiThemeProvider>
          <div>
            <RaisedButton label={props.buttonLabel}
              primary={true}
              style={style}
              onClick={(event) => props.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      </>
    ) : (<></>)

}
export default connect(mapStateToProps, mapDispatch)(AuthFooter)

const style = {
  margin: 15
}