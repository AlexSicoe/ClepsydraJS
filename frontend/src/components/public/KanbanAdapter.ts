import KanbanController, { ICard, ILane } from './KanbanController'
import { ITask, IStage, IProject } from '../../stores/model-interfaces'
import { ID } from '../../util/types'

interface IKanbanAdapter {
  mapTaskToCard: (task: ITask) => ICard
  mapStageToLane: (stage: IStage) => ILane

  setEventBus: (eventBus: any) => void
  addTask: (task: ITask, stageId: ID) => void
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
  mapTaskToCard: (task: ITask) => ICard
  mapStageToLane: (stage: IStage) => ILane

  setEventBus: (eventBus: any) => void
  addTask: (task: ITask, stageId: ID) => void
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

  constructor(private controller: KanbanController) {
    this.mapTaskToCard = (task) => {
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

    this.mapStageToLane = (stage) => {
      const lane: ILane = {
        id: stage.id,
        title: stage.name,
        label: '0/0',
        cards: stage.tasks.map((t) => this.mapTaskToCard(t))
        // currentPage: 1
      }
      return lane
    }

    this.setEventBus = (eventBus) => controller.setEventBus(eventBus)

    this.addTask = (task, stageId) =>
      controller.addCard(this.mapTaskToCard(task), stageId)

    this.moveTask = (taskId, fromStageId, toStageId, position) =>
      controller.moveCard(taskId, fromStageId, toStageId, position)

    this.removeTask = (taskId, stageId, position) =>
      controller.removeCard(taskId, stageId, position)

    this.updateStages = (stages) => {
      const lanes = stages.map((s) => this.mapStageToLane(s))
      controller.updateData(lanes)
    }

    this.onStagesChange = (stages) => {
      const lanes = stages.map((s) => this.mapStageToLane(s))
      const boardData = { lanes }
      controller.onDataChange(boardData)
    }

    this.onTaskAdd = (task, stageId) =>
      controller.onCardAdd(this.mapTaskToCard(task), stageId)

    this.onTaskClick = (taskId, metadata, stageId) =>
      controller.onCardClick(taskId, metadata, stageId)

    this.onTaskDelete = (taskId, stageId) =>
      controller.onCardDelete(taskId, stageId)

    this.onStageClick = (stageId) => controller.onLaneClick(stageId)

    this.onTaskDragStart = (taskId, stageId) =>
      controller.handleDragStart(taskId, stageId)

    this.onTaskDragEnd = (taskId, fromStageId, toStageId) =>
      controller.handleDragEnd(taskId, fromStageId, toStageId)

    this.onStageDragStart = (stageId) => controller.handleLaneDragStart(stageId)

    this.onStageDragEnd = (oldPosition, newPosition, stage) =>
      controller.handleLaneDragEnd(
        oldPosition,
        newPosition,
        this.mapStageToLane(stage)
      )

    this.stageSortFunction = (task1, task2) => {
      const card1 = this.mapTaskToCard(task1)
      const card2 = this.mapTaskToCard(task2)
      return controller.laneSortFunction(card1, card2)
    }
  }
}
