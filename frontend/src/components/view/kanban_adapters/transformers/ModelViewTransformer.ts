import { IStage, ITask } from '../../../../stores/model-interfaces'
import { IBoardData, ICard, ILane } from '../KanbanController'

export interface IModelViewTransformer {
  mapTaskToCard: (task: ITask) => ICard
  mapStageToLane: (stage: IStage) => ILane
  mapStagesToBoardData: (stages: IStage[]) => IBoardData
}

export default class ModelViewTransformer implements IModelViewTransformer {
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
}
