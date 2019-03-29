import { IStage, ITask } from '../../../stores/model-interfaces'
import { ID } from '../../../util/types'
import KanbanController, {
  IBoardData,
  ICard,
  IKanbanController,
  ILane
} from './KanbanController'
import ModelListener, { IModelListener } from './ModelListener'
import ModelViewTransformer, {
  IModelViewTransformer
} from './transformers/ModelViewTransformer'
import ViewModelTransformer, {
  IViewModelTransformer
} from './transformers/ViewModelTransfomer'

interface IKanbanWrapper {
  addTask: (task: ITask) => void
  moveTask: (
    taskId: ID,
    fromStageId: ID,
    toStageId: ID,
    position?: number
  ) => void
  removeTask: (taskId: ID, stageId: ID, position?: number) => void
  updateStages: (stages: IStage[]) => void
}

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

export default class KanbanWrapper implements IKanbanWrapper, IViewListener {
  private mvTransformer: IModelViewTransformer
  private vmTransformer: IViewModelTransformer
  private modelListener: IModelListener
  private controller: IKanbanController

  constructor(private stages: IStage[]) {
    this.mvTransformer = new ModelViewTransformer()
    this.vmTransformer = new ViewModelTransformer()
    this.modelListener = new ModelListener()
    this.controller = new KanbanController(
      this.mvTransformer.mapStagesToBoardData(stages)
    )
  }

  get data() {
    return this.controller.data
  }

  setEventBus = (eventBus: any) => this.controller.setEventBus(eventBus)

  addTask = (task: ITask) => {
    const card = this.mvTransformer.mapTaskToCard(task)
    this.controller.addCard(card, task.stageId)
  }

  moveTask = (
    taskId: ID,
    fromStageId: ID,
    toStageId: ID,
    position?: number
  ) => {
    this.controller.moveCard(taskId, fromStageId, toStageId, position)
  }

  removeTask = (taskId: ID, stageId: ID, position?: number) => {
    this.controller.removeCard(taskId, stageId, position)
  }

  updateStages = (stages: IStage[]) => {
    const lanes = stages.map((s) => this.mvTransformer.mapStageToLane(s))
    this.controller.updateData(lanes)
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
