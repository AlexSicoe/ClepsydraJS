import React, { Component } from 'react'
import KanbanWrapper from '../view/kanban_adapters/KanbanWrapper'
// @ts-ignore
import Board from 'react-trello'

interface IProps {
  // TODO
}

interface IState {
  // TODO
}

export default class KanbanBoard extends Component<IProps, IState> {
  // @ts-ignore
  wrapper = new KanbanWrapper(null)

  componentWillMount() {
    // fetch stages from server
  }

  render() {
    const { wrapper } = this
    return (
      <div>
        <Board
          editable
          draggable
          canAddLanes
          // collapsibleLanes
          data={wrapper.data}
          eventBusHandle={wrapper.setEventBus}
          laneSortFunction={wrapper.laneSortFunction}
          onDataChange={wrapper.onDataChange}
          onCardAdd={wrapper.onCardAdd}
          onCardClick={wrapper.onCardClick}
          onCardDelete={wrapper.onCardDelete}
          onLaneClick={wrapper.onLaneClick}
          handleDragStart={wrapper.onDragStart}
          handleDragEnd={wrapper.onDragEnd}
          handleLaneDragStart={wrapper.onLaneDragStart}
          handleLaneDragEnd={wrapper.onLaneDragEnd}
        />
      </div>
    )
  }
}
