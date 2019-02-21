// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest, NotFound, NotImplemented } = require('@feathersjs/errors')

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async (context) => {
    const { method } = context
    switch (method) {
      case 'create':
        return addStage(context, options)
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
