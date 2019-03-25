import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'
import KanbanController, { ICard } from './KanbanController'

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {
          id: 'Card1',
          title: 'Write Blog',
          description: 'Can AI make memes',
          label: '30 mins'
        },
        {
          id: 'Card2',
          title: 'Pay Rent',
          description: 'Transfer via NEFT',
          label: '5 mins',
          metadata: { sha: 'be312a1' }
        }
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}

const newData = [
  {
    id: 'lane1',
    title: 'Planned Tasks',
    label: '2/2',
    cards: [
      {
        id: 'Card1',
        laneId: 'lane1',
        title: 'Nike',
        description: 'Just do it',
        label: '30 mins'
      }
    ]
  },
  {
    id: 'lane2',
    title: 'Completed',
    label: '0/0',
    cards: [
      {
        id: 'Card2',
        laneId: 'lane2',
        title: 'Do something',
        description: 'Do something something',
        label: '45 mins'
      }
    ]
  }
]

export default class Area51 extends Component<any, any> {
  private controller: KanbanController

  constructor(props: any) {
    super(props)

    this.state = {
      boardData: {
        lanes: []
      }
    }

    this.controller = new KanbanController()
  }

  componentWillMount() {
    const response = data
    this.setState({ boardData: response })
    this.updateBoard()
  }

  updateBoard = () => {
    const { controller } = this

    const card: ICard = {
      id: 'M1',
      title: 'Buy Milk',
      label: '15 mins',
      description: 'Also set reminder'
    }
    setTimeout(() => controller.addCard(card, 'lane1'), 1000)
    setTimeout(() => controller.moveCard('M1', 'lane1', 'lane2'), 2000)
    setTimeout(() => controller.updateData(newData), 3000)
  }

  render() {
    const { controller } = this

    return (
      <div>
        {/*
        // @ts-ignore */}
        <Board
          editable
          draggable
          data={this.state.boardData}
          eventBusHandle={controller.setEventBus}
          onDataChange={controller.handleDataChange}
          onCardAdd={controller.handleCardAdd}
          onCardClick={controller.handleCardClick}
          onCardDelete={controller.handleCardDelete}
          handleDragStart={controller.handleDragStart}
          handleDragEnd={controller.handleDragEnd}
        />
      </div>
    )
  }
}
