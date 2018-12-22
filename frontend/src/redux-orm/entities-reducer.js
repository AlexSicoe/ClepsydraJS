import orm from './orm'
import {
  USER$CREATE,
  USER$UPDATE,
  USER$REMOVE,
  USER$ADD_PROJECT,
  USER$REMOVE_PROJECT
} from '../actions/user-actions';
import { PROJECT$CREATE } from '../actions/project-actions';

const INITIAL_STATE = orm.getEmptyState()

export default (dbState = INITIAL_STATE, action) => {
  const sess = orm.session(dbState)

  const { User, Project, Sprint, Stage, Task } = sess

  switch (action.type) {
    case USER$CREATE:
      User.create(action.payload) //TODO upsert?
      break
    case USER$UPDATE:
      User.withId(action.payload.id).update(action.payload)
      break
    case USER$REMOVE:
      User.withId(action.payload.id).delete()
      break
    case USER$ADD_PROJECT:
      User.withId(action.payload.uid).projects.add(action.payload.project)
      break
    case USER$REMOVE_PROJECT:
      User.withId(action.payload.uid).projects.remove(action.payload.pid)
      break

    case PROJECT$CREATE:
      Project.create(action.payload)
      break
    case 'PROJECT::UPDATE':
      Project.withId(action.payload.id).update(action.payload)
      break
    case 'PROJECT::REMOVE':
      Project.withId(action.payload.id).delete()
      break
    case 'PROJECT::ADD_SPRINT':
      Project.withId(action.payload.pid).sprints.add(action.payload.sprint)
      break
    case 'PROJECT::REMOVE_SPRINT':
      Project.withId(action.payload.pid).sprints.remove(action.payload.sid)
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
      Sprint.withId(action.payload.sid).stages.add(action.payload.stage)
      break
    case 'SPRINT::REMOVE_STAGE':
      Sprint.withId(action.payload.sid).stages.remove(action.payload.stid)
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
      Stage.withId(action.payload.stid).tasks.add(action.payload.task)
      break
    case 'STAGE::REMOVE_TASK':
      Stage.withId(action.payload.stid).tasks.remove(action.payload.tid)
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
      Task.withId(action.payload.tid).user = action.payload.uid;
      break
    case 'TASK::UNASSIGN_USER':
      Task.withId(action.payload.tid).user = undefined //TODO test
      break

    default:
      return dbState
  }

  return sess.state
}