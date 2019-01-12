import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export default function ConfirmForm({
  handleOK,
  handleCancel,
  children
}) {
  return (
    <>
      {children}
      <br />
      <br />
      <Button
        color="secondary"
        variant="contained"
        onClick={() => handleCancel()}
      >
        Cancel
      </Button>

      <Button
        color="primary"
        variant="contained"
        onClick={() => handleOK()}
      >
        OK
      </Button>
    </>
  )
}