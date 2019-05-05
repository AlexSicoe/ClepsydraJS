import { IStage, ITask } from '../../../stores/model-interfaces'
import { ID } from '../../../util/types'
import { IModelListener } from './ModelListener'

export default class LoggerListener implements IModelListener {
  onStagesChange = (stages: IStage[]) => {
    console.log('STAGE DATA CHANGED')
    console.log(stages)
  }

  onTaskAdd = (task: ITask, stageId: ID) => {
    console.log(`NEW TASK ADDED ON STAGE ${stageId}`)
    console.log(task)
  }

  onTaskClick = (taskId: ID, metadata: any, stageId: ID) => {
    console.log('TASK CLICKED')
    console.log(`taskId: ${taskId}`)
    console.log(`stageId: ${stageId}`)
    console.log(`metadata: ${metadata}`)
  }

  onTaskDelete = (taskId: ID, stageId: ID) => {
    console.log('TASK DELETED')
    console.log(`taskId: ${taskId}`)
    console.log(`stageId: ${stageId}`)
  }

  onStageAdd = (stage: IStage) => {
    console.log('stage: ')
    console.log(stage)
  }

  onStageClick = (stageId: ID) => {
    console.log('STAGE CLICKED')
    console.log(`stageId: ${stageId}`)
  }

  onTaskDragStart = (taskId: ID, stageId: ID) => {
    // console.log('TASK DRAG STARTED')
    // console.log(`taskId: ${taskId}`)
    // console.log(`stageId: ${stageId}`)
  }

  onTaskDragEnd = (taskId: ID, fromStageId: ID, toStageId: ID) => {
    console.log('TASK DRAG ENDED')
    console.log(`taskId: ${taskId}`)
    console.log(`fromStageId: ${fromStageId}`)
    console.log(`toStageId: ${toStageId}`)
  }

  onStageDragStart = (stageId: ID) => {
    // console.log('STAGE DRAG STARTED')
    // console.log(`stageId: ${stageId}`)
  }

  onStageDragEnd = (
    oldPosition: number,
    newPosition: number,
    stage: IStage
  ) => {
    console.log('STAGE DRAG ENDED')
    console.log(`oldPosition: ${oldPosition}`)
    console.log(`newPosition: ${newPosition}`)
    console.log('stage:', stage)
  }

  stageSortFunction = (task1: ITask, task2: ITask) => {
    const pos1 = task1.position
    const pos2 = task2.position
    return pos1 < pos2 ? -1 : 1
  }
}
