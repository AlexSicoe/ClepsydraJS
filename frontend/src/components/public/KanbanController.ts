export interface ICard {
  id: string
  title: string
  label: string
  description: string
  laneId?: string
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

  /**
   *  @param index Card's position within lane
   */
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

  /**
   * @param lanes New lane data
   */
  updateData = (lanes: ILane[]) => {
    this.eventBus.publish({
      type: 'UPDATE_LANES',
      lanes
    })
  }

  handleCardAdd = (card: ICard, laneId: string) => {
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
}
