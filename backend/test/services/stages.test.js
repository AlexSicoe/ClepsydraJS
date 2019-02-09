const app = require('../../src/app')

describe("'stages' service", () => {
  it('registered the service', () => {
    const service = app.service('stages')
    expect(service).toBeTruthy()
  })
})
