import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'
import ProjectStore from '../../stores/ProjectStore'
import KanbanAdapter from '../view/kanban_adapters/KanbanAdapter'
import ModelListener from '../view/kanban_adapters/ModelListener'

interface IProps {
  projectStore: ProjectStore
}

interface IInjectedProps extends IProps {}

interface IState {}

export default class KanbanBoard extends Component<IProps, IState> {
  adapter: KanbanAdapter

  constructor(props: IProps) {
    super(props)

    const { projectStore } = props
    const modelListener = new ModelListener(projectStore)

    this.adapter = new KanbanAdapter(projectStore.stages, modelListener)
    projectStore.adapter = this.adapter // maybe not here
  }

  get injected() {
    return this.props as IInjectedProps
  }

  render() {
    const { adapter } = this
    const { stages } = this.props.projectStore

    if (adapter.eventBus) {
      adapter.updateStages(stages)
    }

    return (
      <div>
        <Board
          editable
          draggable
          canAddLanes
          // collapsibleLanes
          data={adapter.data}
          eventBusHandle={adapter.setEventBus}
          laneSortFunction={adapter.laneSortFunction}
          onDataChange={adapter.onDataChange}
          onCardAdd={adapter.onCardAdd}
          onCardClick={adapter.onCardClick}
          onCardDelete={adapter.onCardDelete}
          onLaneAdd={adapter.onLaneAdd}
          onLaneClick={adapter.onLaneClick}
          handleDragStart={adapter.onDragStart}
          handleDragEnd={adapter.onDragEnd}
          handleLaneDragStart={adapter.onLaneDragStart}
          handleLaneDragEnd={adapter.onLaneDragEnd}
        />
      </div>
    )
  }
}
