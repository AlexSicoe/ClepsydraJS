import React from 'react'
import Button from '@material-ui/core/Button'

function BackButton({ callback }) {
  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => callback()}
      >
        Back
      </Button>
    </>
  )
}

export default BackButton