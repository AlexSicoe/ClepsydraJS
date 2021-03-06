// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, params, data } = context
    const userService = app.service('users')

    const options = {
      through: {
        role: 'Admin'
      }
    }

    const user = await userService.Model.findByPk(params.user.id)
    context.result = await user.createProject(data, options)

    return context
  }
}
