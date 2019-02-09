// Initializes the `stages` service on path `/stages`
const createService = require('feathers-sequelize');
const createModel = require('../../models/stages.model');
const hooks = require('./stages.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/stages', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('stages');

  service.hooks(hooks);
};
