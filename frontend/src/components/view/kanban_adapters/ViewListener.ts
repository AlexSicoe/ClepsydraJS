import { ID } from '../../../util/types'
import { IBoardData, ICard, ILane } from './KanbanController'
import ModelListener, { IModelListener } from './ModelListener'
import ViewModelTransformer, {
  IViewModelTransformer
} from './transformers/ViewModelTransfomer'

export interface IViewListener {
  onDataChange: (nextData: IBoardData) => void
  onCardAdd: (card: ICard, laneId: ID) => void
  onCardClick: (cardId: ID, metadata: any, laneId: ID) => void
  onCardDelete: (cardId: ID, laneId: ID) => void
  onLaneClick: (laneId: ID) => void
  onDragStart: (cardId: ID, laneId: ID) => void
  onDragEnd: (cardId: ID, sourceLaneId: ID, targetLaneId: ID) => void
  onLaneDragStart: (laneId: ID) => void
  onLaneDragEnd: (
    oldPosition: number,
    newPositon: number,
    payload: ILane
  ) => void
  laneSortFunction: (card1: ICard, card2: ICard) => number
}

export default class ViewListener implements IViewListener {
  private modelListener: IModelListener
  private vmTransformer: IViewModelTransformer

  constructor() {
    this.modelListener = new ModelListener()
    this.vmTransformer = new ViewModelTransformer()
  }

  // TODO
  // transform view -> model
  // call modelListener
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

  onDragStart = (cardId: ID, laneId: ID) => {
    // console.log('DRAG STARTED')
    // console.log(`cardId: ${cardId}`)
    // console.log(`laneId: ${laneId}`)
  }

  onDragEnd = (cardId: ID, sourceLaneId: ID, targetLaneId: ID) => {
    console.log('DRAG ENDED')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }

  onLaneDragStart = (laneId: ID) => {
    // console.log('LANE DRAG STARTED')
    // console.log(`laneId: ${laneId}`)
  }

  onLaneDragEnd = (
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
