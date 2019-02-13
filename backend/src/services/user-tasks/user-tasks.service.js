// Initializes the `user-tasks` service on path `/user-tasks`
const createService = require('./user-tasks.class.js');
const hooks = require('./user-tasks.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user-tasks', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-tasks');

  service.hooks(hooks);
};
