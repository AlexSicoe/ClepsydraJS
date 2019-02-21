// Initializes the `swapTasks` service on path `/swap-tasks`
const createService = require('./swap-tasks.class.js');
const hooks = require('./swap-tasks.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/swap-tasks', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('swap-tasks');

  service.hooks(hooks);
};
