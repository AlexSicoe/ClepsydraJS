import KanbanController, { ICard, ILane, IBoardData } from './KanbanController'
import { ITask, IStage, IProject } from '../../stores/model-interfaces'
import { ID } from '../../util/types'

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

interface IModelTrelloAdapter {
  mapTaskToCard: (task: ITask) => ICard
  mapStageToLane: (stage: IStage) => ILane
  mapStagesToBoardData: (stages: IStage[]) => IBoardData
  setEventBus: (eventBus: any) => void
}

interface ITrelloCallbacks {
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

export default class KanbanAdapter
  implements IKanbanAdapter, IModelTrelloAdapter, ITrelloCallbacks {
  private controller: KanbanController

  constructor(private stages: IStage[]) {
    this.controller = new KanbanController(this.mapStagesToBoardData(stages))
  }

  get data() {
    return this.controller.data
  }

  mapTaskToCard = (task: ITask) => {
    const card: ICard = {
      id: task.id,
      title: task.name,
      label: '61 mins',
      description: task.description,
      laneId: task.stageId,
      metadata: { position: task.position }
    }
    return card
  }

  mapStageToLane = (stage: IStage) => {
    const lane: ILane = {
      id: stage.id,
      title: stage.name,
      label: `${stage.tasks.length}/${stage.taskLimit}`,
      cards: stage.tasks.map((t) => this.mapTaskToCard(t))
      // currentPage: 1
    }
    return lane
  }

  mapStagesToBoardData = (stages: IStage[]) => {
    console.log('STAGES')
    console.log(stages)
    const lanes = stages.map((s) => this.mapStageToLane(s))
    return { lanes }
  }

  setEventBus = (eventBus: any) => this.controller.setEventBus(eventBus)

  addTask = (task: ITask) => {
    const card = this.mapTaskToCard(task)
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
    const lanes = stages.map((s) => this.mapStageToLane(s))
    this.controller.updateData(lanes)
  }

  // @ts-ignore
  onDataChange = (...args) => this.controller.onDataChange(...args)

  // @ts-ignore
  onCardAdd = (...args) => this.controller.onCardAdd(...args)

  // @ts-ignore
  onCardClick = (...args) => this.controller.onCardClick(...args)

  // @ts-ignore
  onCardDelete = (...args) => this.controller.onCardDelete(...args)

  // @ts-ignore
  onLaneClick = (...args) => this.controller.onLaneClick(...args)

  // @ts-ignore
  onDragStart = (...args) => this.controller.handleDragStart(...args)

  // @ts-ignore
  onDragEnd = (...args) => this.controller.handleDragEnd(...args)

  // @ts-ignore
  onLaneDragStart = (...args) => this.controller.handleLaneDragStart(...args)

  // @ts-ignore
  onLaneDragEnd = (...args) => this.controller.handleLaneDragEnd(...args)

  // @ts-ignore
  laneSortFunction = (...args) => this.controller.laneSortFunction(...args)
}
