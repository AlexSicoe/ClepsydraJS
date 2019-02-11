const errors = require('@feathersjs/errors')
const { NotFound, NotImplemented } = errors

module.exports = function(options = {}) {
  return async (context) => {
    const { method } = context
    switch (method) {
      case 'create':
        return addMember(context, options)
      case 'update':
        return updateMember(context, options)
      case 'remove':
        return removeMember(context, options)
      default:
        throw new NotImplemented(`Method '${method}' not implemented`)
    }

    return context
  }
}

async function addMember(context, options) {
  const { params, service, data } = context

  const { userId, projectId } = params.query
  const { role } = data

  context.result = await service.Model.create({
    role,
    userId,
    projectId
  })

  return context
}

async function updateMember(context, options) {
  const { params, service, data } = context

  const { userId, projectId } = params.query
  const { role } = data

  const member = await service.Model.findOne({
    where: {
      userId,
      projectId
    }
  })
  if (member === null) {
    throw new NotFound('Cannot find Member')
  }
  context.result = await member.update({
    role
  })

  return context
}

async function removeMember(context, options) {
  const { app, params, service } = context

  const { userId, projectId } = params.query

  const member = await service.Model.findOne({
    where: {
      userId,
      projectId
    }
  })
  if (member === null) {
    throw new NotFound('Cannot find Member')
  }
  await member.destroy()
  context.result = member

  const project = await app.service('projects').Model.findByPk(projectId)
  const membersCount = await project.countUsers()
  if (membersCount === 0) await project.destroy()
  return context
}
