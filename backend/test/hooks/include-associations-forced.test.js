const feathers = require('@feathersjs/feathers')
const includeAssociationsForced = require('../../src/hooks/include-associations-forced')

describe("'include-associations-forced' hook", () => {
  let app

  beforeEach(() => {
    app = feathers()

    app.use('/dummy', {
      async get(id) {
        return { id }
      }
    })

    app.service('dummy').hooks({
      after: includeAssociationsForced()
    })
  })

  it('runs the hook', async () => {
    expect.assertions(1)
    const result = await app.service('dummy').get('test')
    expect(result).toEqual({ id: 'test' })
  })
})
