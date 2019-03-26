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

  constructor(private controller: KanbanController) {
    this.mapTaskToCard = (task) => {
      return {} as ICard
    }

    this.mapStageToLane = (stage) => {
      return {} as ILane
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
  }
}
