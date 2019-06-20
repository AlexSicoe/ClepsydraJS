const { NotImplemented } = require('@feathersjs/errors')

module.exports = function(options = {}) {
  return async (context) => {
    const { method } = context
    switch (method) {
      case 'create':
        return logCreate(context, options)
      case 'remove':
        return logRemove(context, options)
      default:
        throw new NotImplemented(`Method not implemented: ${method}`)
    }
  }
}

async function logCreate(context, options) {
  const { app, service, result } = context
  const taskId = result.id

  const task = await service.Model.findByPk(taskId)
  let stage = await task.getStage()
  let project = await stage.getProject()
  let stages = await project.getStages()
  let taskCounters = await Promise.all(stages.map((s) => s.countTasks()))
  let counter = taskCounters.reduce((acc, cur) => acc + cur)

  await project.createTaskLog({
    type: 'ADD_TASK',
    taskId,
    counter
  })

  return context
}

async function logRemove(context, options) {
  const { app, service, type } = context
  const taskId = context.id

  if (type === 'error') {
    // await project.destroyTaskLog({
    //// Where taskId === params.taskId && type === 'REMOVE_TASK'
    // })
    return context
  }

  const task = await service.Model.findByPk(taskId)
  let stage = await task.getStage()
  let project = await stage.getProject()
  let stages = await project.getStages()
  let taskCounters = await Promise.all(stages.map((s) => s.countTasks()))
  let counter = taskCounters.reduce((acc, cur) => acc + cur)
  counter--

  await project.createTaskLog({
    type: 'REMOVE_TASK',
    taskId,
    counter
  })

  return context
}
