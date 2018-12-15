import orm from './orm'

const emptyDBState = orm.getEmptyState()
const session = orm.session(emptyDBState)
// const User = session.User
// const Project = session.Project
//...

// User.withId(1).update({username: 'John Doe'})
// User.all().filter(user => user.username === 'John Doe').delete()
// User.idExists(1) //false

// const updatedDbState = session.state
