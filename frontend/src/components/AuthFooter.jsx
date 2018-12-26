import React from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import styles from '../material-styles'

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
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={(event) => props.handleClick(event)}
          >
            {props.buttonLabel}
          </Button>
        </div>
      </>
    ) : (<></>)

}

const reduxContainer = connect(mapStateToProps, mapDispatch)(AuthFooter)
export default withStyles(styles)(reduxContainer)