import { IStage, ITask } from '../../../../stores/model-interfaces'
import { ICard, ILane } from '../KanbanController'

export interface IViewModelTransformer {
  mapCardToTask: (card: ICard) => ITask
  mapLaneToStage: (lane: ILane) => IStage
}

export default class ViewModelTransformer implements IViewModelTransformer {
  mapCardToTask = (card: ICard): ITask => {
    // if (card.metadata === undefined) throw new Error(`Card has no metadata`)

    return {
      id: card.id as number,
      name: card.title,
      description: card.description,
      stageId: card.laneId as number,
      position: (card.metadata && card.metadata.position) || 0
    }
  }

  mapLaneToStage = (lane: ILane): IStage => {
    return {
      id: lane.id as number,
      name: lane.title,
      taskLimit: 999, // TODO
      tasks: lane.cards.map((c) => this.mapCardToTask(c)),
      position: 0, // TODO
      projectId: 0 // TODO
    }
  }
}
