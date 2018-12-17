// @flow

import { createSelector } from 'redux-orm'
import orm from './orm'

export const userSelector = createSelector(
  orm,
  (state) => state.entities,
  ({ User }) => User.all().toModelArray()
    .map(user =>
      ({
        ...user.ref,
        projects: user.projects.toRefArray().map(p => p.name)
      })
    )
)