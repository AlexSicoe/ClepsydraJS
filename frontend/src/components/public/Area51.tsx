import React, { Component } from 'react'
// @ts-ignore
import Board from 'react-trello'

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
  state = {
    boardData: {
      lanes: []
    }
    // eventBus: null,
  }

  setEventBus = (eventBus: any) => {
    this.setState({ eventBus })
  }

  addCard = () => {
    // @ts-ignore
    this.state.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'lane1',
      card: {
        id: 'M1',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Also set reminder'
      }
    })
  }

  completeCard = () => {
    // @ts-ignore
    this.state.eventBus.publish({
      type: 'MOVE_CARD',
      fromLaneId: 'lane1',
      toLaneId: 'lane2',
      cardId: 'M1',
      index: 0
    })
  }

  updateData(newLaneData: any) {
    // @ts-ignore
    this.state.eventBus.publish({
      type: 'UPDATE_LANES',
      lanes: newLaneData
    })
  }

  handleCardAdd = (card: any, laneId: string) => {
    console.log(`New card added to lane ${laneId}`)
    console.log(card)
  }

  handleCardClick = (cardId: string, metadata: any, laneId: string) => {
    console.log('Card clicked')
    console.log(cardId, metadata, laneId)
  }

  handleCardDelete = (cardId: string, laneId: string) => {
    console.log('Card deleted')
    console.log(cardId, laneId)
  }

  handleDelete = () => {
    console.log('handled delete')
  }

  handleDataChange = (nextData: any) => {
    console.log('New card has been added')
    console.log(nextData)
  }

  handleDragStart = (cardId: string, laneId: string) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }

  handleDragEnd = (
    cardId: string,
    sourceLaneId: string,
    targetLaneId: string
  ) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }

  componentWillMount() {
    const response = data
    this.setState({ boardData: response })
    setTimeout(this.addCard, 1000)
    setTimeout(this.completeCard, 2000)
    setTimeout(this.updateData.bind(this, newData), 3000)
  }

  render() {
    return (
      <div>
        {/*
        // @ts-ignore */}
        <Board
          editable
          draggable
          data={this.state.boardData}
          onDataChange={this.handleDataChange}
          eventBusHandle={this.setEventBus}
          onCardAdd={this.handleCardAdd}
          onCardClick={this.handleCardClick}
          onCardDelete={this.handleCardDelete}
          handleDragStart={this.handleDragStart}
          handleDragEnd={this.handleDragEnd}
        />
      </div>
    )
  }
}
