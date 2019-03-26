import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'
import { IStage, ITask } from '../../stores/model-interfaces'
import KanbanAdapter from './KanbanAdapter'

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
  private adapter: KanbanAdapter

  constructor(props: any) {
    super(props)

    this.adapter = new KanbanAdapter(mockData)
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
          data={adapter.controller.data}
          eventBusHandle={adapter.setEventBus}
          laneSortFunction={adapter.stageSortFunction}
          // FIX
          // onDataChange={adapter.onStagesChange}
          onCardAdd={adapter.onTaskAdd}
          onCardClick={adapter.onTaskClick}
          onCardDelete={adapter.onTaskDelete}
          onLaneClick={adapter.onStageClick}
          handleDragStart={adapter.onTaskDragStart}
          handleDragEnd={adapter.onTaskDragEnd}
          handleLaneDragStart={adapter.onStageDragStart}
          handleLaneDragEnd={adapter.onStageDragEnd}
        />
      </div>
    )
  }
}
