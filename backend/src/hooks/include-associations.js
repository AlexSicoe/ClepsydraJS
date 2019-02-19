// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
//https://github.com/feathersjs-ecosystem/feathers-sequelize

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { params, service } = context
    const { query } = params
    if (!query) return context

    if (query.$include === 'true') {
      const associations = Object.keys(service.Model.associations)
      params.sequelize = {
        include: associations,
        raw: false
      }
    }
    delete query.$include
    return context
  }
}
