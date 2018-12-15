import orm from './orm'

const INITIAL_STATE = orm.getEmptyState()

export default (state = INITIAL_STATE, action) => {
  const sess = orm.session(state)

  const { User, Project, Sprint, Stage, Task } = sess

  switch (action.type) {
    case 'USER::CREATE':
      User.create(action.payload)
      return sess.state
    case 'USER::UPDATE':
      User.withId(action.payload.id).update(action.payload)
      return sess.state
    case 'USER::DESTROY':
      User.withId(action.payload.id).delete()
      return sess.state
    case 'USER::ADD_PROJECT':
      User.withId(action.payload.userId).projects.add(action.payload.project)
      return sess.state
    case 'USER::REMOVE_PROJECT':
      User.withId(action.payload.userId).projects.remove(action.payload.projectId)
      return sess.state
    case 'USER::ASSIGN_TASK':
      Task.withId(action.payload.taskId).publisher = action.payload.userId;
      return sess.state
    case 'PROJECT::CREATE': //Really?
      Project.create(action.payload)
      return sess.state
    default:
      return state //todo CHECK
  }
}