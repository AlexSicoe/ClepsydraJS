const { NotImplemented, BadRequest } = require('@feathersjs/errors')

module.exports = function(options = {}) {
  return async (context) => {
    const { method } = context
    switch (method) {
      case 'create':
        return assignTask(context, options)
      case 'remove':
        return unassignTask(context, options)
      default:
        throw new NotImplemented(`Method not implemented: ${method}`)
    }
  }
}

async function assignTask(context, options) {
  const { params, app } = context

  if (!params.query) {
    throw new BadRequest('Inexistent query')
  }
  const { userId, taskId } = params.query
  if (!userId || !taskId) {
    throw new BadRequest('userId or taskId not specified')
  }

  const user = await app.service('users').Model.findByPk(userId)
  context.result = await user.addTask(taskId)

  return context
}

async function unassignTask(context, options) {
  const { params, app } = context

  if (!params.query) {
    throw new BadRequest('Inexistent query')
  }
  const { userId, taskId } = params.query
  if (!userId || !taskId) {
    throw new BadRequest('userId or taskId not specified')
  }

  const user = await app.service('users').Model.findByPk(userId)
  context.result = await user.removeTask(taskId)

  return context
}
