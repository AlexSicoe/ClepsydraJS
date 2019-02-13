const { authenticate } = require('@feathersjs/authentication').hooks;

const handleUserTasks = require('../../hooks/handle-user-tasks');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [handleUserTasks()],
    update: [],
    patch: [],
    remove: [handleUserTasks()]
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
};
