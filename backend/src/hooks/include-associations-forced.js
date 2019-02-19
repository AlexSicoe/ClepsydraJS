// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { service, result } = context

    // console.log('RESULT: ', result)

    let id
    if (result.id) {
      id = result.id
    }

    if (result.dataValues) {
      id = result.dataValues.id
    }

    if (id === undefined) {
      throw new Error('id is undefined...')
    }

    context.result = await service.get(id, {
      query: {
        $include: 'true'
      }
    })

    return context
  }
}
