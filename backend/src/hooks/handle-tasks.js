/**
 * @typedef {import("@feathersjs/feathers").HookContext} HookContext
 */

const errors = require('@feathersjs/errors')
const { BadRequest, NotFound, NotImplemented } = errors

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async (context) => {
    const { method } = context
    switch (method) {
      case 'create':
        return addTask(context, options)
      default:
        throw new NotImplemented(`Method not implemented: ${method}`)
    }
  }
}

/**
 * @param {HookContext} context
 * @param {{}} options
 */
async function addTask(context, options) {
  const { app, params, data } = context

  if (!params.query) {
    throw new BadRequest('Inexistent query')
  }
  const { stageId } = params.query
  if (!stageId) {
    throw new BadRequest('stageId not specified')
  }

  const stage = await app.service('stages').Model.findByPk(stageId)
  if (!stage) {
    throw new NotFound('Cannot find stage')
  }
  data.position = (await stage.countTasks()) + 1
  context.result = await stage.createTask(data)

  return context
}
