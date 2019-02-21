// Initializes the `swapStages` service on path `/swap-stages`
const createService = require('./swap-stages.class.js');
const hooks = require('./swap-stages.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/swap-stages', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('swap-stages');

  service.hooks(hooks);
};
