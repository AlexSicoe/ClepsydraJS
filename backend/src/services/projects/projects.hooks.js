const { authenticate } = require('@feathersjs/authentication').hooks
const createProject = require('../../hooks/create-project')
const includeAssociationsForced = require('../../hooks/include-associations-forced')

const populateProject = require('../../hooks/populate-project')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [createProject(), populateProject()],
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
