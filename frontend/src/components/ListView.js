import React from 'react'
import PropTypes from 'prop-types'

export function ListView({
  items,
  emptyListMessage = "The list is empty!",
}) {

  ListView.propTypes = {
    items: PropTypes.array
  }

  return (
    <>
      {items.length ?
        <ListViewMap items={items} /> :
        emptyListMessage
      }
    </>
  )
}



function ListViewMap({ items }) {
  const mappedItems = items.map(item =>
    <li key={item.id}>{item.name}</li>)

  return (
    <div className='listView'>
      <ol>{mappedItems}</ol>
    </div>
  )
}
