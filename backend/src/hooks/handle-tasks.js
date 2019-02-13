/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors')
const { BadRequest, NotFound, NotImplemented } = errors

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async (context) => {
    const { method } = context
    switch (method) {
      case 'create':
        return addTask(context, options)
      case 'remove':
        return removeTask(context, options)
      case 'patch':
        return swapTasks(context, options)
      default:
        throw new NotImplemented(`Method not implemented: ${method}`)
    }
  }

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

  async function removeTask(context, options) {
    const { app, params } = context

    if (!params) {
      throw new BadRequest('Inexistent params')
    }
    const { taskId } = params
    //

    const task = await app.service('tasks').Model.findByPk(taskId)
    const { position, stageId } = task

    //TODO
  }

  async function swapTasks(context, options) {
    const { service, params } = context

    if (!params.query) {
      throw new BadRequest('Inexistent query')
    }
    const { sourceId, targetId } = params.query
    if (!sourceId || !targetId) {
      throw new BadRequest('sourceId or targetId not specified')
    }

    let [source, target] = await Promise.all(
      service.Model.findByPk(sourceId),
      service.Model.findByPk(targetId)
    )

    if (!source || !target) {
      throw new NotFound('One of the tasks was not found')
    }

    if (source.stageId !== target.stageId) {
      const [newTargetStageId, newSourceStageId] = [
        source.stageId,
        target.stageId
      ]

      ;[source, target] = await Promise.all(
        source.update({ stageId: newSourceStageId }),
        target.update({ stageId: newTargetStageId })
      )
    }

    if (source.position !== target.position) {
      const [newTargetPos, newSourcePos] = [source.position, target.position]

      ;[source, target] = await Promise.all(
        source.update({ position: newSourcePos }),
        target.update({ position: newTargetPos })
      )
    }

    context.result = [source, target]

    return context
  }
}
