const users = require('./users/users.service.js')
const projects = require('./projects/projects.service.js')
const stages = require('./stages/stages.service.js')
const tasks = require('./tasks/tasks.service.js')
const members = require('./members/members.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users)
  app.configure(projects)
  app.configure(members)
  app.configure(stages)
  app.configure(tasks)
}
