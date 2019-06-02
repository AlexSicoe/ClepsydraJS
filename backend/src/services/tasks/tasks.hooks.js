const { authenticate } = require('@feathersjs/authentication').hooks

const handleTasks = require('../../hooks/handle-tasks')

const logTasks = require('../../hooks/log-tasks')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [handleTasks()],
    update: [],
    patch: [],
    remove: [logTasks()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [logTasks()],
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
    remove: [logTasks()]
  }
}
