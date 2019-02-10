// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { params, service } = context
    if (params.query.include) {
      const associations = Object.keys(service.Model.associations)
      params.sequelize = {
        include: [...associations]
      }
      delete params.query.include
    }
    return context
  }
}
