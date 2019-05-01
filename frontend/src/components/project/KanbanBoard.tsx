import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'
import { IStage } from '../../stores/model-interfaces'
import KanbanWrapper from '../view/kanban_adapters/KanbanWrapper'

interface IProps {
  stages: IStage[]
}

interface IInjectedProps extends IProps {}

interface IState {
  // TODO
}

export default class KanbanBoard extends Component<IProps, IState> {
  wrapper: KanbanWrapper

  constructor(props: IProps) {
    super(props)

    this.state = {}

    // console.log('====STAGES====')
    // console.log(toJS(props.stages))
    // console.log('==============')
    this.wrapper = new KanbanWrapper(props.stages)
  }

  get injected() {
    return this.props as IInjectedProps
  }

  render() {
    const { wrapper } = this
    const { stages } = this.props

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
