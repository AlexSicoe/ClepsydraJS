const { authenticate } = require('@feathersjs/authentication').hooks
const includeAssociationsForced = require('../../hooks/include-associations-forced')

const handleStages = require('../../hooks/handle-stages')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [handleStages()],
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
