import React from 'react'

export function ListView({ items, emptyListMessage = "The list is empty!" }) {
  return (<>
    {items.length ?
      <ListViewMap items={items} /> :
      <>{emptyListMessage}</>}
  </>);
}


function ListViewMap({ items }) {
  const mappedItems = items.map(p => <li key={p.id}>{p.name}</li>);
  return (
    <div className='listView'>
      Here's a list of your projects:
    <br />
      <ol>{mappedItems}</ol>
    </div>);
}
