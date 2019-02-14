// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async (context) => {
    const { params, service } = context
    if (params.query.$whoAmI === 'true') {
      const associations = Object.keys(service.Model.associations)
      const user = await service.Model.findByPk(params.user.id, {
        include: associations
      })

      context.result = user
    }
    return context
  }
}
