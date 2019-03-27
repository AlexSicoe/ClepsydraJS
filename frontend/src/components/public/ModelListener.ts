import { IStage, ITask } from '../../stores/model-interfaces'
import { ID } from '../../util/types'

export interface IModelListener {
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

export default class ModelListener implements IModelListener {
  onStagesChange = (stages: IStage[]) => {
    // TODO
  }

  onTaskAdd = (task: ITask, stageId: ID) => {
    // TODO
  }

  onTaskClick = (taskId: ID, metadata: any, stageId: ID) => {
    // TODO
  }

  onTaskDelete = (taskId: ID, stageId: ID) => {
    // TODO
  }
  onStageClick = (stageId: ID) => {
    // TODO
  }

  onTaskDragStart = (taskId: ID, stageId: ID) => {
    // TODO
  }

  onTaskDragEnd = (taskId: ID, fromStageId: ID, toStageId: ID) => {
    // TODO
  }

  onStageDragStart = (stageId: ID) => {
    // TODO
  }

  onStageDragEnd = (
    oldPosition: number,
    newPosition: number,
    stage: IStage
  ) => {
    // TODO
  }

  stageSortFunction = (task1: ITask, task2: ITask) => {
    // TODO
    return 0
  }
}
