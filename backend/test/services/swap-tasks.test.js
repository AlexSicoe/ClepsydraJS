const app = require('../../src/app');

describe('\'swapTasks\' service', () => {
  it('registered the service', () => {
    const service = app.service('swap-tasks');
    expect(service).toBeTruthy();
  });
});
