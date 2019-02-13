const app = require('../../src/app');

describe('\'user-tasks\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-tasks');
    expect(service).toBeTruthy();
  });
});
