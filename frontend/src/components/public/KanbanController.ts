import { ID } from '../../util/types'

export interface ICardMetadata {
  position?: number
  [key: string]: any
}
export interface ICard {
  id: ID
  title: string
  label: string
  description: string
  laneId?: ID
  metadata?: ICardMetadata
}

export interface ILane {
  id: ID
  title: string
  label: string
  cards: ICard[]
  currentPage?: number
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

  addCard = (card: ICard, laneId: ID) => {
    this.eventBus.publish({
      type: 'ADD_CARD',
      card,
      laneId
    })
  }

  moveCard = (cardId: ID, fromLaneId: ID, toLaneId: ID, index = 0) => {
    this.eventBus.publish({
      type: 'MOVE_CARD',
      cardId,
      fromLaneId,
      toLaneId,
      index
    })
  }

  removeCard = (cardId: ID, laneId: ID, index = 0) => {
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

  onDataChange = (nextData: IBoardData) => {
    console.log('DATA CHANGED')
    console.log(nextData)
  }

  onCardAdd = (card: ICard, laneId: ID) => {
    console.log(`NEW CARD ADDED ON LANE ${laneId}`)
    console.log(card)
  }

  onCardClick = (cardId: ID, metadata: any, laneId: ID) => {
    console.log('CARD CLICKED')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
    console.log(`metadata: ${metadata}`)
  }

  onCardDelete = (cardId: ID, laneId: ID) => {
    console.log('CARD DELETED')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
  }

  onLaneClick = (laneId: ID) => {
    console.log('LANE CLICKED')
    console.log(`laneId: ${laneId}`)
  }

  handleDragStart = (cardId: ID, laneId: ID) => {
    // console.log('DRAG STARTED')
    // console.log(`cardId: ${cardId}`)
    // console.log(`laneId: ${laneId}`)
  }

  handleDragEnd = (cardId: ID, sourceLaneId: ID, targetLaneId: ID) => {
    console.log('DRAG ENDED')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }

  handleLaneDragStart = (laneId: ID) => {
    // console.log('LANE DRAG STARTED')
    // console.log(`laneId: ${laneId}`)
  }

  handleLaneDragEnd = (
    oldPosition: number,
    newPosition: number,
    payload: ILane
  ) => {
    console.log('LANE DRAG ENDED')
    console.log(`oldPosition: ${oldPosition}`)
    console.log(`newPosition: ${newPosition}`)
    console.log('payload:', payload)
  }

  laneSortFunction = (card1: ICard, card2: ICard) => {
    if (!card1.metadata || !card2.metadata) {
      return 1
    }
    const pos1 = card1.metadata.position
    const pos2 = card2.metadata.position
    if (!pos1 || !pos2) {
      return 1
    }
    return pos1 < pos2 ? -1 : 1
  }
}
