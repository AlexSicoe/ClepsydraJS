import { IStage, ITask } from '../../../../stores/model-interfaces'
import { ICard, ILane } from '../KanbanController'

export interface IViewModelTransformer {
  mapCardToTask: (card: ICard) => ITask
  mapLaneToStage: (lane: ILane) => IStage
}

export default class ViewModelTransformer implements IViewModelTransformer {
  mapCardToTask = (card: ICard): ITask => {
    return {
      id: card.id as number,
      name: card.title,
      description: card.description,
      stageId: card.laneId as number,
      position: (card.metadata && card.metadata.position) || undefined!
    }
  }

  mapLaneToStage = (lane: ILane): IStage => {
    return {
      id: lane.id as number,
      name: lane.title!,
      taskLimit: undefined!, // TODO
      tasks: (lane.cards && lane.cards.map((c) => this.mapCardToTask(c))) || [],
      position: undefined!, // TODO
      projectId: undefined! // TODO
    }
  }
}
