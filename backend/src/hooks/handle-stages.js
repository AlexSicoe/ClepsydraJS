// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('@feathersjs/errors')
const { BadRequest, NotFound, NotImplemented, Forbidden } = errors

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async (context) => {
    const { method } = context
    switch (method) {
      case 'create':
        return addStage(context, options)
      case 'patch':
        return swapStages(context, options)
      default:
        throw new NotImplemented(`Method not implemented: ${method}`)
    }
  }
}

async function addStage(context, options) {
  const { app, params, data } = context

  if (!params.query) {
    throw new BadRequest('Inexistent query')
  }
  const { projectId } = params.query
  if (!projectId) {
    throw new BadRequest('projectId not specified')
  }
  const project = await app.service('projects').Model.findByPk(projectId)
  if (!project) {
    throw new NotFound('Cannot find project')
  }
  data.position = (await project.countStages()) + 1
  context.result = await project.createStage(data)
}

async function swapStages(context, options) {
  const { service, params } = context

  if (!params.query) {
    throw new BadRequest('Inexistent query')
  }
  const { sourceId, targetId } = params.query
  if (!sourceId || !targetId) {
    throw new BadRequest('sourceId or targetId not specified')
  }

  //TODO frontend: on stage patched, swap positions
  //or emit from here

  let [source, target] = await Promise.all(
    service.Model.findByPk(sourceId),
    service.Model.findByPk(targetId)
  )

  if (!source || !target) {
    throw new NotFound('One of the stages was not found')
  }

  if (source.projectId !== target.projectId) {
    throw new Forbidden('Source and target stages are not in the same project')
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
