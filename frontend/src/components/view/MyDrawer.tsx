import { Divider, IconButton, List } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import React, { Component } from 'react'
import { Callback } from '../../util/types'
import * as Icons from '@material-ui/icons'

const drawerWidth = 240

const styles = (theme: any) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

export interface IDrawerItem {
  text: string
  iconType: string
  handleClick: Callback
}

interface IProps {
  open: boolean
  handleClose: Callback
  classes: any
  theme: any
  items?: IDrawerItem[]
}

function renderIcon(iconType: string) {
  switch (iconType) {
    case 'Mail':
      return <Icons.Mail />
    case 'MoveToInbox':
      return <Icons.MoveToInbox />
    case 'Settings':
      return <Icons.Settings />
    case 'Dashboard':
      return <Icons.Dashboard />
    case 'LibraryBooks':
      return <Icons.LibraryBooks />
    case 'Code':
      return <Icons.Code />
    case 'AccountBox':
      return <Icons.AccountBox />
    case 'People':
      return <Icons.People />
    default:
      throw new Error('Unknown iconType case')
  }
}

const mapData = (item: IDrawerItem) => (
  <ListItem button key={item.text} onClick={item.handleClick}>
    <ListItemIcon>{renderIcon(item.iconType)}</ListItemIcon>
    <ListItemText primary={item.text} />
  </ListItem>
)

const MOCK_ITEMS: IDrawerItem[] = [
  {
    text: 'Inbox',
    iconType: 'MoveToInbox',
    handleClick: () => console.log("I'm an inbox")
  },
  {
    text: 'Starred',
    iconType: 'MoveToInbox',
    handleClick: () => console.log("I'm a starred inbox")
  },
  {
    text: 'Send email',
    iconType: 'Mail',
    handleClick: () => console.log('Sending mail...')
  },
  {
    text: 'Drafts',
    iconType: 'Mail',
    handleClick: () => console.log('Hello from the drafts')
  },
  {
    text: 'Settings',
    iconType: 'Settings',
    handleClick: () => console.log('Setting stuff')
  }
]

class MyDrawer extends Component<IProps, any> {
  render() {
    const { open, handleClose, classes, theme, items = MOCK_ITEMS } = this.props

    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>{items.map(mapData)}</List>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MyDrawer)
