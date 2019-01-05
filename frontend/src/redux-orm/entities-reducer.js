import orm from './orm'
import {
  USER$CREATE,
  USER$UPDATE,
  USER$UPSERT,
  USER$REMOVE,
  USER$ADD_PROJECT,
  USER$REMOVE_PROJECT,
} from '../actions/user-actions'
import { PROJECT$CREATE as PROJECT$UPSERT } from '../actions/project-actions';

const INITIAL_STATE = orm.getEmptyState()

export default (dbState = INITIAL_STATE, action) => {
  const sess = orm.session(dbState)

  const { User, Project, Sprint, Stage, Task } = sess

  switch (action.type) {
    case USER$UPSERT:
      User.upsert(action.payload)
      break
    case USER$REMOVE:
      User.withId(action.payload.id).delete()
      break

    case PROJECT$UPSERT:
      Project.upsert(action.payload)
      break
    case 'PROJECT::REMOVE':
      Project.withId(action.payload.id).delete()
      break

    case 'SRPINT::UPSERT':
      Sprint.upsert(action.payload)
      break
    case 'SPRINT::REMOVE':
      Sprint.withId(action.payload.id).delete()
      break

    case 'STAGE::UPSERT':
      Stage.upsert(action.payload)
      break
    case 'STAGE::REMOVE':
      Stage.withId(action.payload.id).delete()
      break

    case 'TASK::UPSERT':
      Task.upsert(action.payload)
      break
    case 'TASK::REMOVE':
      Task.withId(action.payload.id).delete()
      break

    default:
      return dbState
  }

  return sess.state
}