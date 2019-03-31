import React, { useState, ReactChild, FunctionComponent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { withStyles } from '@material-ui/core/styles'
import MyDrawer, { IDrawerItem } from './MyDrawer'
import classNames from 'classnames'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

interface IProps {
  classes: any
  title: string
  drawerItems?: IDrawerItem[]
}

const SimpleAppBar: FunctionComponent<IProps> = ({
  classes,
  title,
  drawerItems,
  children
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = () => {
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classNames(classes.menuButton, open && classes.hide)}
            color="inherit"
            aria-label="Menu"
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.grow} color="inherit" variant="h6">
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
      <MyDrawer
        open={isDrawerOpen}
        handleClose={closeDrawer}
        items={drawerItems}
      />
    </div>
  )
}

export default withStyles(styles)(SimpleAppBar)
