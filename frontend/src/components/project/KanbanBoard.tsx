import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'
import ProjectStore from '../../stores/ProjectStore'
import KanbanWrapper from '../view/kanban_adapters/KanbanWrapper'
import { IStage } from '../../stores/model-interfaces'
import { toJS } from 'mobx'

interface IProps {}

interface IInjectedProps extends IProps {
  projectStore: ProjectStore
}

interface IState {
  // TODO
}

@inject('projectStore')
@observer
export default class KanbanBoard extends Component<IProps, IState> {
  wrapper: KanbanWrapper

  constructor(props: IProps) {
    super(props)

    this.state = {}

    const { projectStore } = this.injected
    this.wrapper = new KanbanWrapper(projectStore.stages)
  }

  get injected() {
    return this.props as IInjectedProps
  }

  render() {
    const { wrapper } = this
    const { projectStore } = this.injected
    // wrapper.updateStages()
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
