const { authenticate } = require('@feathersjs/authentication').hooks
const createProject = require('../../hooks/create-project')
const includeAssociationsForced = require('../../hooks/include-associations-forced')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [createProject()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [includeAssociationsForced()],
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
