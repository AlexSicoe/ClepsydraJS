import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'
import ProjectStore from '../../stores/ProjectStore'
import KanbanWrapper from '../view/kanban_adapters/KanbanWrapper'
import ModelListener from '../view/kanban_adapters/ModelListener'

interface IProps {
  projectStore: ProjectStore
}

interface IInjectedProps extends IProps {}

interface IState {}

export default class KanbanBoard extends Component<IProps, IState> {
  wrapper: KanbanWrapper

  constructor(props: IProps) {
    super(props)

    const { projectStore } = props
    const modelListener = new ModelListener(projectStore)

    this.wrapper = new KanbanWrapper(projectStore.stages, modelListener)
  }

  get injected() {
    return this.props as IInjectedProps
  }

  render() {
    const { wrapper } = this
    const { stages } = this.props.projectStore

    if (wrapper.eventBus) {
      wrapper.updateStages(stages)
    }

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
