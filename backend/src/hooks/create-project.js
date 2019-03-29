// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { app, params, data } = context
    const userService = app.service('users')
    const projectService = app.service('projects')
    const stageService = app.service('stages')

    const options = {
      through: {
        role: 'Admin'
      }
    }

    const user = await userService.Model.findByPk(params.user.id)
    const projectRes = await user.createProject(data, options)

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
        projectId: projectRes.id
      }
    }

    await Promise.all(
      defaultStages.map((s) => stageService.create(s, stageOptions))
    )

    const project = await projectService.get(projectRes.id)

    context.result = project

    return context
  }
}
