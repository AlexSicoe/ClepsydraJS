import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

export default function SimpleAppBar({ title, children }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className="menuButton" color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography className="grow" variant="h6" color="inherit">
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}