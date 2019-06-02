const feathers = require('@feathersjs/feathers')
const handleUserTasks = require('../../src/hooks/handle-user-tasks')

describe("'handle-user-tasks' hook", () => {
  let app

  beforeEach(() => {
    app = feathers()

    app.use('/dummy', {
      async get(id) {
        return { id }
      }
    })

    app.service('dummy').hooks({
      before: handleUserTasks()
    })
  })

  it('runs the hook', async () => {
    expect.assertions(1)
    const result = await app.service('dummy').get('test')
    expect(result).toEqual({ id: 'test' })
  })
})
