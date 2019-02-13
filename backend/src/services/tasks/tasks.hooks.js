const { authenticate } = require('@feathersjs/authentication').hooks

const handleTasks = require('../../hooks/handle-tasks')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [handleTasks()],
    update: [],
    patch: [handleTasks()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
