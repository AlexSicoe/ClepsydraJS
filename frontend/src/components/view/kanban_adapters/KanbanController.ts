import { ID } from '../../../util/types'

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

export interface IEventBus {
  publish: () => void
}
export interface IKanbanController {
  data: IBoardData
  setEventBus: (eventBus: any) => void
  getEventBus: () => any
  addCard: (card: ICard, laneId: ID) => void
  moveCard: (cardId: ID, fromLaneId: ID, toLaneId: ID, index?: number) => void
  removeCard: (cardId: ID, laneId: ID, index?: number) => void
  updateLanes: (lanes: ILane[]) => void
}
export default class KanbanController {
  private eventBus: any

  constructor(public data: IBoardData) {}

  setEventBus = (eventBus: any) => {
    this.eventBus = eventBus
  }

  getEventBus = () => {
    return this.eventBus
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

  updateLanes = (lanes: ILane[]) => {
    this.eventBus.publish({
      type: 'UPDATE_LANES',
      lanes
    })
  }
}
