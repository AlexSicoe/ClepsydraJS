import { ORM } from 'redux-orm'
import { User, Project, Sprint, Stage, Task } from './models'

const orm = new ORM()
orm.register(User, Project, Sprint, Stage, Task)

// const initialState = orm.getEmptyState()
// const session = orm.session(initialState)
// session.User.create({ username: 'John Doe', id: -1, })
// const nextState = session.state

export default orm