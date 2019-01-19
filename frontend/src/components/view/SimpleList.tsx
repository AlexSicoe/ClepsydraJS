import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import _ from 'lodash'

const styles = (theme: any) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

const defaultItemView = (onItemClick: any, item: any) => (
  <ListItem
    divider
    button
    key={item.id}
    onClick={() => onItemClick(item)}>
    <ListItemText primary={item.name} />
  </ListItem>
)

function SimpleList(props: any) {
  const {
    classes,
    items,
    subheader,
    emptyMessage = 'Empty List',
    onItemClick,
    onItemView = defaultItemView
  } = props

  return (
    <div className={classes.root}>
      <List component="nav" subheader={subheader} >
        {!items.length ? <> <br /> {emptyMessage} </> :
          items.map(_.curry(onItemView)(onItemClick))
        }
      </List>
    </div>
  )
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleList);