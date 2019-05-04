import { IStage, ITask } from '../../../stores/model-interfaces'
import { ID } from '../../../util/types'
import KanbanController, {
  IBoardData,
  ICard,
  IKanbanController,
  ILane
} from './KanbanController'
import { IModelListener } from './ModelListener'
import ModelViewTransformer, {
  IModelViewTransformer
} from './transformers/ModelViewTransformer'
import ViewModelTransformer, {
  IViewModelTransformer
} from './transformers/ViewModelTransfomer'

interface IKanbanAdapter {
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
  onLaneDragEnd: (oldPosition: number, newPositon: number, lane: ILane) => void
  laneSortFunction: (card1: ICard, card2: ICard) => number
}

export default class KanbanAdapter implements IKanbanAdapter, IViewListener {
  private mvTransformer: IModelViewTransformer
  private vmTransformer: IViewModelTransformer
  private controller: IKanbanController

  constructor(stages: IStage[], private modelListener: IModelListener) {
    this.mvTransformer = new ModelViewTransformer()
    this.vmTransformer = new ViewModelTransformer()
    const boardData = this.mvTransformer.mapStagesToBoardData(stages)
    this.controller = new KanbanController(boardData)
  }

  get data() {
    return this.controller.data
  }

  get eventBus() {
    return this.controller.getEventBus()
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
    this.controller.updateLanes(lanes)
  }

  onDataChange = (nextData: IBoardData) => {
    const stages = nextData.lanes.map((l) =>
      this.vmTransformer.mapLaneToStage(l)
    )
    this.modelListener.onStagesChange(stages)
  }

  onCardAdd = (card: ICard, laneId: ID) => {
    const task = this.vmTransformer.mapCardToTask(card)
    this.modelListener.onTaskAdd(task, laneId)
  }

  onCardClick = (cardId: ID, metadata: any, laneId: ID) => {
    this.modelListener.onTaskClick(cardId, metadata, laneId)
  }

  onCardDelete = (cardId: ID, laneId: ID) => {
    this.modelListener.onTaskDelete(cardId, laneId)
  }

  onLaneClick = (laneId: ID) => {
    this.modelListener.onStageClick(laneId)
  }

  onDragStart = (cardId: ID, laneId: ID) => {
    this.modelListener.onTaskDragStart(cardId, laneId)
  }

  onDragEnd = (cardId: ID, sourceLaneId: ID, targetLaneId: ID) => {
    this.modelListener.onTaskDragEnd(cardId, sourceLaneId, targetLaneId)
  }

  onLaneDragStart = (laneId: ID) => {
    this.modelListener.onStageDragStart(laneId)
  }

  onLaneDragEnd = (oldPosition: number, newPosition: number, lane: ILane) => {
    const stage = this.vmTransformer.mapLaneToStage(lane)
    this.modelListener.onStageDragEnd(oldPosition, newPosition, stage)
  }

  laneSortFunction = (card1: ICard, card2: ICard) => {
    const task1 = this.vmTransformer.mapCardToTask(card1)
    const task2 = this.vmTransformer.mapCardToTask(card2)
    return this.modelListener.stageSortFunction(task1, task2)
  }
}
