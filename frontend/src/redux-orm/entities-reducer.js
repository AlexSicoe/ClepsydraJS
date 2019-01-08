import orm from './orm'
import {
  USER$UPSERT,
  USER$DESTROY,

} from '../actions/user-actions'
import {
  PROJECT$UPSERT,
  PROJECT$DESTROY,
} from '../actions/project-actions';

const INITIAL_STATE = orm.getEmptyState()

export default (dbState = INITIAL_STATE, action) => {
  const sess = orm.session(dbState)

  const { User, Project, Sprint, Stage, Task } = sess

  switch (action.type) {
    case USER$UPSERT:
      User.upsert(action.payload)
      break
    case USER$DESTROY:
      User.withId(action.payload.id).delete()
      break

    case PROJECT$UPSERT:
      Project.upsert(action.payload)
      break
    case PROJECT$DESTROY:
      Project.withId(action.payload.id).delete()
      break

    case 'SRPINT::UPSERT':
      Sprint.upsert(action.payload)
      break
    case 'SPRINT::DESTROY':
      Sprint.withId(action.payload.id).delete()
      break

    case 'STAGE::UPSERT':
      Stage.upsert(action.payload)
      break
    case 'STAGE::DESTROY':
      Stage.withId(action.payload.id).delete()
      break

    case 'TASK::UPSERT':
      Task.upsert(action.payload)
      break
    case 'TASK::DESTROY':
      Task.withId(action.payload.id).delete()
      break

    default:
      return dbState
  }

  return sess.state
}