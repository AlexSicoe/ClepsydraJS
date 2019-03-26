export interface ICard {
  id: string
  title: string
  label: string
  description: string
  laneId?: string
  metadata?: any
}

export interface ILane {
  id: string
  title: string
  label: string
  cards: ICard[]
}

export interface IBoardData {
  lanes: ILane[]
}

export default class KanbanController {
  private eventBus: any

  constructor(public data: IBoardData) {}

  setEventBus = (eventBus: any) => {
    console.log('SET EVENT BUS')
    this.eventBus = eventBus
  }

  addCard = (card: ICard, laneId: string) => {
    this.eventBus.publish({
      type: 'ADD_CARD',
      card,
      laneId
    })
  }

  moveCard = (
    cardId: string,
    fromLaneId: string,
    toLaneId: string,
    index = 0
  ) => {
    this.eventBus.publish({
      type: 'MOVE_CARD',
      cardId,
      fromLaneId,
      toLaneId,
      index
    })
  }

  removeCard = (cardId: string, laneId: string, index = 0) => {
    this.eventBus.publish({
      type: 'REMOVE_CARD',
      cardId,
      laneId,
      index
    })
  }

  updateData = (lanes: ILane[]) => {
    this.eventBus.publish({
      type: 'UPDATE_LANES',
      lanes
    })
  }

  onDataChange = (nextData: any) => {
    console.log('DATA CHANGED')
    console.log(nextData)
  }

  onCardAdd = (card: ICard, laneId: string) => {
    console.log(`NEW CARD ADDED ON LANE ${laneId}`)
    console.log(card)
  }

  onCardClick = (cardId: string, metadata: any, laneId: string) => {
    console.log('CARD CLICKED')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
    console.log(`metadata: ${metadata}`)
  }

  onCardDelete = (cardId: string, laneId: string) => {
    console.log('CARD DELETED')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }

  onLaneClick = (laneId: number) => {
    console.log('LANE CLICKED')
    console.log(`laneId: ${laneId}`)
  }

  handleDragStart = (cardId: string, laneId: string) => {
    console.log('DRAG STARTED')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }

  handleDragEnd = (
    cardId: string,
    sourceLaneId: string,
    targetLaneId: string
  ) => {
    console.log('DRAG ENDED')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }

  handleLaneDragStart = (laneId: string) => {
    console.log('LANE DRAG STARTED')
    console.log(`laneId: ${laneId}`)
  }

  handleLaneDragEnd = (laneId: string, newPosition: number, payload: any) => {
    console.log('LANE DRAG ENDED')
    console.log(`laneId: ${laneId}`)
    console.log(`newPosition: ${newPosition}`)
    console.log(`payload: ${payload}`)
  }
}
