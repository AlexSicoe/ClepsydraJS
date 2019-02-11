const { authenticate } = require('@feathersjs/authentication').hooks

const handleMembers = require('../../hooks/handle-members')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [handleMembers()],
    update: [handleMembers()],
    patch: [handleMembers()],
    remove: [handleMembers()]
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
