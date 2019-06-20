// Initializes the `taskLogs` service on path `/task-logs`
const createService = require('feathers-sequelize')
const createModel = require('../../models/task-logs.model')
const hooks = require('./task-logs.hooks')

module.exports = function(app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/task-logs', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('task-logs')

  service.hooks(hooks)
}
