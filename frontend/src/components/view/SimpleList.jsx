import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})




function SimpleList({
  classes,
  items,
  subheader,
  emptyMessage = 'Empty List',
  onItemClick,
  onItemView = defaultItemView
}) {
  function defaultItemView(item) {
    return (
      <ListItem
        divider
        button
        key={item.id}
        onClick={() => onItemClick(item)}>
        <ListItemText primary={item.name} />
      </ListItem>
    )
  }
  return (
    <div className={classes.root}>

      <List component="nav" subheader={subheader} >
        {!items.length ? <> <br /> {emptyMessage} </> :
          items.map(onItemView)
        }
      </List>
    </div>
  )
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleList);