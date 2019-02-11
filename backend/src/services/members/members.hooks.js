const { authenticate } = require('@feathersjs/authentication').hooks

const removeMember = require('../../hooks/remove-member');

const addMember = require('../../hooks/add-member');

const updateMember = require('../../hooks/update-member');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [addMember()],
    update: [updateMember()],
    patch: [],
    remove: [removeMember()]
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
