import { IStage, ITask } from '../../stores/model-interfaces'
import { ICard, ILane } from './KanbanController'

export interface IViewModelTransformer {
  mapCardToTask: (card: ICard) => ITask
  mapLaneToStage: (lane: ILane) => IStage
}

export default class ViewModelTransformer implements IViewModelTransformer {
  mapCardToTask = (card: ICard) => {
    // TODO
    return {} as ITask
  }
  mapLaneToStage = (lane: ILane) => {
    // TODO
    return {} as IStage
  }
}
