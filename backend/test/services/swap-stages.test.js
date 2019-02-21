const app = require('../../src/app');

describe('\'swapStages\' service', () => {
  it('registered the service', () => {
    const service = app.service('swap-stages');
    expect(service).toBeTruthy();
  });
});
