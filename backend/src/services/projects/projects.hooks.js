const { authenticate } = require('@feathersjs/authentication').hooks

const userCreatesProject = require('../../hooks/user-creates-project')

const includeMembers = require('../../hooks/include-members');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [includeMembers()],
    get: [includeMembers()],
    create: [userCreatesProject()],
    update: [],
    patch: [],
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
