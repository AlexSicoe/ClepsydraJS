const app = require('../../src/app')

describe("'taskLogs' service", () => {
  it('registered the service', () => {
    const service = app.service('task-logs')
    expect(service).toBeTruthy()
  })
})
