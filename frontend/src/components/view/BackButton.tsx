import React from 'react'
import Button from '@material-ui/core/Button'


const DEFAULT_CALLBACK = () => { console.warn("Callback not implemented!") }

function BackButton({ callback = DEFAULT_CALLBACK }) {
  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => callback()}
    >
      Back
    </Button>
  )
}

export default BackButton