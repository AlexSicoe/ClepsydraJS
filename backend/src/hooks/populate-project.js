// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async (context) => {
    const { app, result } = context
    const projectService = app.service('projects')
    const stageService = app.service('stages')
    const taskService = app.service('tasks')

    const stages = [
      {
        name: 'To do'
      },
      {
        name: 'In progress'
      },
      {
        name: 'Done'
      }
    ]

    const stageOptions = {
      query: {
        projectId: result.id
      }
    }

    const stagesRes = await Promise.all(
      stages.map((s) => stageService.create(s, stageOptions))
    )

    const tasks = [
      {
        name: 'Research backend architecture',
        description: 'Google it'
      },
      {
        name: 'Cleanup code',
        description: 'Apply a design pattern'
      }
    ]

    const taskOptions = {
      query: {
        stageId: stagesRes[0].id
      }
    }

    await Promise.all(tasks.map((t) => taskService.create(t, taskOptions)))

    context.result = await projectService.get(result.id)

    return context
  }
}
