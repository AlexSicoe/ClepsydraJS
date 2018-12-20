// @flow
import { createSelector } from 'redux-orm'
import orm from './orm'

const getEntities = (state) => state.entities

export const getUsers = createSelector(
  orm,
  getEntities,
  ({ User }) => User.all().toModelArray().map(user =>
    ({
      ...user.ref,
      projects: user.projects.toRefArray().map(p => p.name)
    })
  )
)

export const getProjects = createSelector(
  orm,
  getEntities,
  ({ Project }) => Project.all().toModelArray().map(project =>
    ({
      ...project.ref,
      users: project.users.toRefArray().map(u => u.name)
    })
  )
)

export const getSprints = createSelector(
  orm,
  getEntities,
  ({ Sprint }) => Sprint.all().toModelArray().map(sprint =>
    ({
      ...sprint.ref,
    })
  )
)

export const getStage = createSelector(
  orm,
  getEntities,
  ({ Stage }) => Stage.all().toModelArray().map(stage =>
    ({
      ...stage.ref,
    })
  )
)

export const getTask = createSelector(
  orm,
  getEntities,
  ({ Task }) => Task.all().toModelArray().map(task =>
    ({
      ...task.ref,
    })
  )
)