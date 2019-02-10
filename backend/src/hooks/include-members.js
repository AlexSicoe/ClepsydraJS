// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, params, service } = context
    if (params.query.include) {
      console.log(await service.Model.getTableName())
      const User = app.service('users').Model
      params.sequelize = {
        include: [User]
      }
      delete params.query.include
    }
    return await context
  }
}
