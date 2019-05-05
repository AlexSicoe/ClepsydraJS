import { IStage, ITask } from '../../../stores/model-interfaces'
import { ID } from '../../../util/types'
import ProjectStore from '../../../stores/ProjectStore'

export interface IModelListener {
  onStagesChange: (stages: IStage[]) => void
  onTaskAdd: (task: ITask, stageId: ID) => void
  onTaskClick: (taskId: ID, metadata: any, stageId: ID) => void
  onTaskDelete: (taskId: ID, stageId: ID) => void
  onStageAdd: (stage: IStage) => void
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
  constructor(private projectStore: ProjectStore) {}

  onStagesChange = (stages: IStage[]) => {
    console.log('STAGE DATA CHANGED')
    console.log(stages)
  }

  onTaskAdd = (task: ITask, stageId: ID) => {
    this.projectStore.addTask(stageId, task)
  }

  onTaskClick = (taskId: ID, metadata: any, stageId: ID) => {
    console.log('TASK CLICKED')
    console.log(`taskId: ${taskId}`)
    console.log(`stageId: ${stageId}`)
    console.log(`metadata: ${metadata}`)
    console.log(metadata)
  }

  onTaskDelete = (taskId: ID, stageId: ID) => {
    this.projectStore.removeTask(taskId)
  }

  onStageAdd = (stage: IStage) => {
    this.projectStore.addStage(stage)
  }

  onStageClick = (stageId: ID) => {
    console.log('STAGE CLICKED')
    console.log(`stageId: ${stageId}`)
  }

  onTaskDragStart = (taskId: ID, stageId: ID) => {
    //
  }

  onTaskDragEnd = (taskId: ID, fromStageId: ID, toStageId: ID) => {
    this.projectStore.swapTasks(fromStageId, toStageId)
  }

  onStageDragStart = (stageId: ID) => {
    //
  }

  onStageDragEnd = (
    oldPosition: number,
    newPosition: number,
    stage: IStage
  ) => {
    this.projectStore.swapStages(oldPosition, newPosition)
  }

  stageSortFunction = (task1: ITask, task2: ITask) => {
    const pos1 = task1.position
    const pos2 = task2.position
    return pos1 - pos2
  }
}
