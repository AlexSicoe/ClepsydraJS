/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors')
const { NotImplemented } = errors

class Service {
  constructor(options) {
    this.options = options || {}
  }

  async find(params) {
    throw new NotImplemented()
  }

  async get(id, params) {
    throw new NotImplemented()
  }

  async create(data, params) {
    throw new NotImplemented()
  }

  async update(id, data, params) {
    throw new NotImplemented()
  }

  async patch(id, data, params) {
    throw new NotImplemented()
  }

  async remove(id, params) {
    throw new NotImplemented()
  }
}

module.exports = function(options) {
  return new Service(options)
}

module.exports.Service = Service
