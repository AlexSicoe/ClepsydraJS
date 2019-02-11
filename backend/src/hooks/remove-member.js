// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
  return async (context) => {
    const { params, service } = context

    const { userId, projectId } = params.query

    const member = await service.Model.findOne({
      where: {
        userId,
        projectId
      }
    })
    if (member === null) {
      throw new Error('Member not found')
    }
    await member.destroy()
    context.result = member
    return context
  }
}
