import KanbanController, { ICard, ILane, IBoardData } from './KanbanController'
import { ITask, IStage, IProject } from '../../stores/model-interfaces'
import { ID } from '../../util/types'

interface IKanbanAdapter {
  mapTaskToCard: (task: ITask) => ICard
  mapStageToLane: (stage: IStage) => ILane
  mapStagesToBoardData: (stages: IStage[]) => IBoardData

  setEventBus: (eventBus: any) => void
  addTask: (task: ITask) => void
  moveTask: (
    taskId: ID,
    fromStageId: ID,
    toStageId: ID,
    position?: number
  ) => void
  removeTask: (taskId: ID, stageId: ID, position?: number) => void
  updateStages: (stages: IStage[]) => void
  onStagesChange: (stages: IStage[]) => void
  onTaskAdd: (task: ITask, stageId: ID) => void
  onTaskClick: (taskId: ID, metadata: any, stageId: ID) => void
  onTaskDelete: (taskId: ID, stageId: ID) => void
  onStageClick: (stageId: ID) => void
  onTaskDragStart: (taskId: ID, stageId: ID) => void
  onTaskDragEnd: (taskId: ID, fromStageId: ID, toStageId: ID) => void
  onStageDragStart: (stageId: ID) => void
  onStageDragEnd: (
    oldPosition: number,
    newPosition: number,
    stage: IStage
  ) => void
  stageSortFunction: (task1: ITask, task2: ITask) => number
}

export default class KanbanAdapter implements IKanbanAdapter {
  public controller: KanbanController

  constructor(private data: IStage[]) {
    this.controller = new KanbanController(this.mapStagesToBoardData(data))
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

  moveTask = (taskId: ID, fromStageId: ID, toStageId: ID, position?: number) =>
    this.controller.moveCard(taskId, fromStageId, toStageId, position)

  removeTask = (taskId: ID, stageId: ID, position?: number) =>
    this.controller.removeCard(taskId, stageId, position)

  updateStages = (stages: IStage[]) => {
    const lanes = stages.map((s) => this.mapStageToLane(s))
    this.controller.updateData(lanes)
  }

  onStagesChange = (stages: IStage[]) =>
    this.controller.onDataChange(this.mapStagesToBoardData(stages))

  onTaskAdd = (task: ITask, stageId: ID) =>
    this.controller.onCardAdd(this.mapTaskToCard(task), stageId)

  onTaskClick = (taskId: ID, metadata: any, stageId: ID) =>
    this.controller.onCardClick(taskId, metadata, stageId)

  onTaskDelete = (taskId: ID, stageId: ID) =>
    this.controller.onCardDelete(taskId, stageId)

  onStageClick = (stageId: ID) => this.controller.onLaneClick(stageId)

  onTaskDragStart = (taskId: ID, stageId: ID) =>
    this.controller.handleDragStart(taskId, stageId)

  onTaskDragEnd = (taskId: ID, fromStageId: ID, toStageId: ID) =>
    this.controller.handleDragEnd(taskId, fromStageId, toStageId)

  onStageDragStart = (stageId: ID) =>
    this.controller.handleLaneDragStart(stageId)

  onStageDragEnd = (oldPosition: number, newPosition: number, stage: IStage) =>
    this.controller.handleLaneDragEnd(
      oldPosition,
      newPosition,
      this.mapStageToLane(stage)
    )

  stageSortFunction = (task1: ITask, task2: ITask) => {
    const card1 = this.mapTaskToCard(task1)
    const card2 = this.mapTaskToCard(task2)
    return this.controller.laneSortFunction(card1, card2)
  }
}
