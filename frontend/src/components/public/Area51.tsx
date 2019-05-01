import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'
import { IStage, ITask } from '../../stores/model-interfaces'
import KanbanWrapper from '../view/kanban_adapters/KanbanWrapper'
import LoggerListener from '../view/kanban_adapters/LoggerListener'

interface IProps {}

const mockData: IStage[] = [
  {
    id: 1,
    name: 'Planned Tasks',
    projectId: 1,
    position: 1,
    taskLimit: 5,
    tasks: [
      {
        id: 1,
        name: 'Write Blog',
        description: 'Can AI make memes',
        stageId: 1,
        position: 1
      },
      {
        id: 2,
        name: 'Pay Rent',
        description: 'Transfer via NEFT',
        stageId: 1,
        position: 2
      }
    ]
  },
  {
    id: 2,
    name: 'Completed',
    projectId: 1,
    position: 2,
    taskLimit: 3,
    tasks: []
  }
]

const newData: IStage[] = [
  {
    id: 1,
    name: 'Planned Tasks',
    projectId: 1,
    position: 1,
    taskLimit: 2,
    tasks: [
      {
        id: 1,
        stageId: 1,
        name: 'Nike',
        description: 'Just do it',
        position: 1
      }
    ]
  },
  {
    id: 2,
    name: 'Completed',
    projectId: 1,
    position: 2,
    taskLimit: 0,
    tasks: [
      {
        id: 2,
        stageId: 2,
        name: 'Do something',
        description: 'Do something something',
        position: 2
      }
    ]
  }
]

export default class Area51 extends Component<any, any> {
  wrapper: KanbanWrapper

  constructor(props: IProps) {
    super(props)
    const loggerListener = new LoggerListener()
    this.wrapper = new KanbanWrapper(mockData, loggerListener)
  }

  componentWillMount() {
    this.simulateUpdates()
  }

  simulateUpdates = () => {
    const { wrapper } = this

    const task: ITask = {
      id: 5,
      name: 'Buy Milk',
      description: 'Also set reminder',
      stageId: 2,
      position: 3
    }
    setTimeout(() => wrapper.addTask(task), 1000)
    setTimeout(() => wrapper.moveTask(5, 2, 1), 2000)
    setTimeout(() => wrapper.updateStages(newData), 3000)
    setTimeout(() => wrapper.removeTask(2, 2), 4000)
  }

  render() {
    const { wrapper } = this
    return (
      <div>
        {/*
        // @ts-ignore */}
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
