/**
 * @typedef {import("@feathersjs/feathers").HookContext} HookContext
 */

const { NotFound, NotImplemented, BadRequest } = require('@feathersjs/errors')

module.exports = (options = {}) =>
  /**
   * @param {HookContext} context
   */
  async (context) => {
    const { method, path } = context

    if (method !== 'patch') return context

    switch (path) {
      case 'swap-tasks':
        return swapTasks(context, options)
      case 'swap-stages':
        return swapStages(context, options)
      default:
        throw new NotImplemented('swap-positions hook not implemented')
    }
  }

/**
 * @param {HookContext} context
 * @param {{}} options
 */

// eslint-disable-next-line no-unused-vars
// @ts-ignore
async function swapTasks(context, options) {
  const { app, params } = context
  if (!params.query) {
    throw new BadRequest('Inexistent query')
  }
  const { sourceId, targetId } = params.query
  if (!sourceId || !targetId) {
    throw new BadRequest('sourceId or targetId not specified')
  }

  const taskService = app.service('tasks')
  const resFind = await taskService.find({
    query: {
      id: {
        $in: [sourceId, targetId]
      },
      $limit: 2,
      $select: ['id', 'position']
    }
  })

  if (resFind.total !== 2) {
    throw new NotFound('One of the tasks was not found')
  }

  const [source, target] = resFind.data
  ;[source.position, target.position] = [target.position, source.position]

  const promise1 = taskService.patch(source.id, source)
  const promise2 = taskService.patch(target.id, target)
  context.result = await Promise.all([promise1, promise2])
  return context
}

/**
 * @param {HookContext} context
 * @param {{}} options
 */
// eslint-disable-next-line no-unused-vars
async function swapStages(context, options) {
  const { app, params } = context

  if (!params.query) {
    throw new BadRequest('Inexistent query')
  }
  const { sourceId, targetId } = params.query
  if (!sourceId || !targetId) {
    throw new BadRequest('sourceId or targetId not specified')
  }

  const stageService = app.service('stages')
  const resFind = await stageService.find({
    query: {
      id: {
        $in: [sourceId, targetId]
      },
      $limit: 2,
      $select: ['id', 'position']
    }
  })

  if (resFind.total !== 2) {
    throw new NotFound('One of the stages was not found')
  }

  const [source, target] = resFind.data
  ;[source.position, target.position] = [target.position, source.position]

  const promise1 = stageService.patch(source.id, source)
  const promise2 = stageService.patch(target.id, target)
  context.result = await Promise.all([promise1, promise2])
  return context
}
