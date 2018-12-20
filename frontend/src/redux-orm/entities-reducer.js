import orm from './orm'

const INITIAL_STATE = orm.getEmptyState()

export default (dbState = INITIAL_STATE, action) => {
  const sess = orm.session(dbState)

  const { User, Project, Sprint, Stage, Task } = sess

  switch (action.type) {
    case 'USER::CREATE':
      User.create(action.payload) //TODO upsert?
      break
    case 'USER::UPDATE':
      User.withId(action.payload.id).update(action.payload)
      break
    case 'USER::REMOVE':
      User.withId(action.payload.id).delete()
      break
    case 'USER::ADD_PROJECT':
      User.withId(action.payload.userId).projects.add(action.payload.project)
      break
    case 'USER::REMOVE_PROJECT':
      User.withId(action.payload.userId).projects.remove(action.payload.projectId)
      break

    case 'PROJECT::CREATE':
      Project.create(action.payload)
      break
    case 'PROJECT::UPDATE':
      Project.withId(action.payload.id).update(action.payload)
      break
    case 'PROJECT::REMOVE':
      Project.withId(action.payload.id).delete()
      break
    case 'PROJECT::ADD_SPRINT':
      Project.withId(action.payload.projectId).sprints.add(action.payload.sprint)
      break
    case 'PROJECT::REMOVE_SPRINT':
      Project.withId(action.payload.projectId).sprints.remove(action.payload.sprintId)
      break

    case 'SRPINT::CREATE':
      Sprint.create(action.payload)
      break
    case 'SPRINT::UPDATE':
      Sprint.withId(action.payload.id).update(action.payload)
      break
    case 'SPRINT::REMOVE':
      Sprint.withId(action.payload.id).delete()
      break
    case 'SPRINT::ADD_STAGE':
      Sprint.withId(action.payload.sprintId).stages.add(action.payload.stage)
      break
    case 'SPRINT::REMOVE_STAGE':
      Sprint.withId(action.payload.sprintId).stages.remove(action.payload.stageId)
      break

    case 'STAGE::CREATE':
      Stage.create(action.payload)
      break
    case 'STAGE::UPDATE':
      Stage.withId(action.payload.id).update(action.payload)
      break
    case 'STAGE::REMOVE':
      Stage.withId(action.payload.id).delete()
      break
    case 'STAGE::ADD_TASK':
      Stage.withId(action.payload.stageId).tasks.add(action.payload.task)
      break
    case 'STAGE::REMOVE_TASK':
      Stage.withId(action.payload.stageId).tasks.remove(action.payload.taskId)
      break

    case 'TASK::CREATE':
      Task.create(action.payload)
      break
    case 'TASK::UPDATE':
      Task.withId(action.payload.id).update(action.payload)
      break
    case 'TASK::REMOVE':
      Task.withId(action.payload.id).delete()
      break
    case 'TASK::ASSIGN_USER':
      Task.withId(action.payload.taskId).user = action.payload.userId;
      break
    case 'TASK::UNASSIGN_USER':
      Task.withId(action.payload.taskId).user = undefined //TODO test
      break

    default:
      return dbState
  }

  return sess.state
}