/* eslint-disable no-unused-vars */
const errors = require('@feathersjs/errors')
const { BadRequest, NotFound, NotImplemented } = errors
const isMail = require('../../util/isMail')

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
        throw new NotImplemented(`Method not implemented: ${method}`)
    }
  }
}

async function addMember(context, options) {
  const { params, data, app, service } = context

  if (!params.query) {
    throw new BadRequest('Inexistent query')
  }

  const { role } = data

  let { mailOrName, userId, projectId } = params.query
  if (!projectId) {
    throw new BadRequest('projectId not specified')
  }
  if (mailOrName) {
    const userService = app.service('users')
    let resFind

    if (isMail(mailOrName)) {
      let email = mailOrName
      resFind = await userService.find({
        query: {
          $limit: 1,
          email
        }
      })
    } else {
      let name = mailOrName
      resFind = await userService.find({
        query: {
          $limit: 1,
          name
        }
      })
    }
    if (resFind.total !== 1) {
      throw new NotFound('User not found')
    }
    const user = resFind.data[0]
    userId = user.id
  }

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
  if (!member) {
    throw new NotFound('Cannot find member')
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
  if (!member) {
    throw new NotFound('Cannot find member')
  }
  await member.destroy()
  context.result = member

  const project = await app.service('projects').Model.findByPk(projectId)
  const membersCount = await project.countUsers()
  if (membersCount === 0) await project.destroy()
  return context
}
