// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async (context) => {
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
      throw new Error('Member not found')
    }
    context.result = await member.update({
      role
    })

    return context
  }
}
