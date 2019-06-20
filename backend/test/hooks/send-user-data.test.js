const feathers = require('@feathersjs/feathers')
const sendUserData = require('../../src/hooks/send-user-data')

describe("'send-user-data' hook", () => {
  let app

  beforeEach(() => {
    app = feathers()

    app.use('/dummy', {
      async get(id) {
        return { id }
      }
    })

    app.service('dummy').hooks({
      before: sendUserData()
    })
  })

  it('runs the hook', async () => {
    expect.assertions(1)
    const result = await app.service('dummy').get('test')
    expect(result).toEqual({ id: 'test' })
  })
})
