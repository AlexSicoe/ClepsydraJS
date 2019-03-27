import { IStage, ITask } from '../../../stores/model-interfaces'
import { ID } from '../../../util/types'
import KanbanController, { IKanbanController } from './KanbanController'
import ModelViewTransformer, {
  IModelViewTransformer
} from './transformers/ModelViewTransformer'
import ViewListener, { IViewListener } from './ViewListener'

interface IKanbanWrapper {
  addTask: (task: ITask) => void
  moveTask: (
    taskId: ID,
    fromStageId: ID,
    toStageId: ID,
    position?: number
  ) => void
  removeTask: (taskId: ID, stageId: ID, position?: number) => void
  updateStages: (stages: IStage[]) => void
}

export default class KanbanWrapper implements IKanbanWrapper, IViewListener {
  private mvTransformer: IModelViewTransformer
  private viewListener: IViewListener
  private controller: IKanbanController

  constructor(private stages: IStage[]) {
    this.mvTransformer = new ModelViewTransformer()
    this.viewListener = new ViewListener()
    this.controller = new KanbanController(
      this.mvTransformer.mapStagesToBoardData(stages)
    )
  }

  get data() {
    return this.controller.data
  }

  setEventBus = (eventBus: any) => this.controller.setEventBus(eventBus)

  addTask = (task: ITask) => {
    const card = this.mvTransformer.mapTaskToCard(task)
    this.controller.addCard(card, task.stageId)
  }

  moveTask = (
    taskId: ID,
    fromStageId: ID,
    toStageId: ID,
    position?: number
  ) => {
    this.controller.moveCard(taskId, fromStageId, toStageId, position)
  }

  removeTask = (taskId: ID, stageId: ID, position?: number) => {
    this.controller.removeCard(taskId, stageId, position)
  }

  updateStages = (stages: IStage[]) => {
    const lanes = stages.map((s) => this.mvTransformer.mapStageToLane(s))
    this.controller.updateData(lanes)
  }

  // @ts-ignore
  onDataChange = (...args) => this.viewListener.onDataChange(...args)

  // @ts-ignore
  onCardAdd = (...args) => this.viewListener.onCardAdd(...args)

  // @ts-ignore
  onCardClick = (...args) => this.viewListener.onCardClick(...args)

  // @ts-ignore
  onCardDelete = (...args) => this.viewListener.onCardDelete(...args)

  // @ts-ignore
  onLaneClick = (...args) => this.viewListener.onLaneClick(...args)

  // @ts-ignore
  onDragStart = (...args) => this.viewListener.onDragStart(...args)

  // @ts-ignore
  onDragEnd = (...args) => this.viewListener.onDragEnd(...args)

  // @ts-ignore
  onLaneDragStart = (...args) => this.viewListener.onLaneDragStart(...args)

  // @ts-ignore
  onLaneDragEnd = (...args) => this.viewListener.onLaneDragEnd(...args)

  // @ts-ignore
  laneSortFunction = (...args) => this.viewListener.laneSortFunction(...args)
}
