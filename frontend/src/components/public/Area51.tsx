import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'
import { IStage, ITask } from '../../stores/model-interfaces'
import KanbanAdapter from '../view/kanban_adapters/KanbanAdapter'
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
  adapter: KanbanAdapter

  constructor(props: IProps) {
    super(props)
    const loggerListener = new LoggerListener()
    this.adapter = new KanbanAdapter(mockData, loggerListener)
  }

  componentWillMount() {
    this.simulateUpdates()
  }

  simulateUpdates = () => {
    const { adapter } = this

    const task: ITask = {
      id: 5,
      name: 'Buy Milk',
      description: 'Also set reminder',
      stageId: 2,
      position: 3
    }
    setTimeout(() => adapter.addTask(task), 1000)
    setTimeout(() => adapter.moveTask(5, 2, 1), 2000)
    setTimeout(() => adapter.updateStages(newData), 3000)
    setTimeout(() => adapter.removeTask(2, 2), 4000)
  }

  render() {
    const { adapter } = this
    return (
      <div>
        {/*
        // @ts-ignore */}
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
