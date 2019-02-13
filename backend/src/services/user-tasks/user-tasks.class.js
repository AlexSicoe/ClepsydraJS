/* eslint-disable no-unused-vars */

const errors = require('@feathersjs/errors')
const { NotImplemented } = errors

class Service {
  constructor(options) {
    this.options = options || {}
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return data
  }

  async remove(id, params) {
    return { id }
  }

  async find(params) {
    throw NotImplemented('Method not implemented: find')
  }

  async get(id, params) {
    throw NotImplemented('Method not implemented: get')
  }

  async update(id, data, params) {
    throw NotImplemented('Method not implemented: update')
  }

  async patch(id, data, params) {
    throw NotImplemented('Method not implemented: patch')
  }
}

module.exports = function(options) {
  return new Service(options)
}

module.exports.Service = Service
