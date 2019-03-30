// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async (context) => {
    const { app, result } = context
    const projectService = app.service('projects')
    const stageService = app.service('stages')

    const defaultStages = [
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

    await Promise.all(
      defaultStages.map((s) => stageService.create(s, stageOptions))
    )

    context.result = await projectService.get(result.id)

    return context
  }
}
