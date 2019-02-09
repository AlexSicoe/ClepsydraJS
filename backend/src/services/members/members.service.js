// Initializes the `members` service on path `/members`
const createService = require('feathers-sequelize');
const createModel = require('../../models/members.model');
const hooks = require('./members.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/members', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('members');

  service.hooks(hooks);
};
