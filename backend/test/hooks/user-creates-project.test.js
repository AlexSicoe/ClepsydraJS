const feathers = require('@feathersjs/feathers')
const userCreatesProject = require('../../src/hooks/user-creates-project')

describe("'user-creates-project' hook", () => {
  let app

  beforeEach(() => {
    app = feathers()

    app.use('/dummy', {
      async get(id) {
        return { id }
      }
    })

    app.service('dummy').hooks({
      before: userCreatesProject()
    })
  })

  it('runs the hook', async () => {
    expect.assertions(1)
    const result = await app.service('dummy').get('test')
    expect(result).toEqual({ id: 'test' })
  })
})
