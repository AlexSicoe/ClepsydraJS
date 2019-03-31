import { IStage, ITask } from '../../../../stores/model-interfaces'
import { IBoardData, ICard, ILane } from '../KanbanController'

export interface IModelViewTransformer {
  mapTaskToCard: (task: ITask) => ICard
  mapStageToLane: (stage: IStage) => ILane
  mapStagesToBoardData: (stages: IStage[]) => IBoardData
}

export default class ModelViewTransformer implements IModelViewTransformer {
  mapTaskToCard = (task: ITask): ICard => {
    return {
      id: task.id,
      title: task.name,
      label: '61 mins', // TODO
      description: task.description,
      laneId: task.stageId,
      metadata: { position: task.position }
    }
  }

  mapStageToLane = (stage: IStage): ILane => {
    return {
      id: stage.id,
      title: stage.name,
      label: `${stage.tasks.length}/${stage.taskLimit}`,
      cards: stage.tasks.map((t) => this.mapTaskToCard(t))
      // currentPage: 1
    }
  }

  mapStagesToBoardData = (stages: IStage[]) => {
    // console.log('STAGES')
    // console.log(stages)
    const lanes = stages.map((s) => this.mapStageToLane(s))
    return { lanes }
  }
}
