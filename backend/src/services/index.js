const users = require('./users/users.service.js')
const projects = require('./projects/projects.service.js')
const stages = require('./stages/stages.service.js')
const tasks = require('./tasks/tasks.service.js')
const members = require('./members/members.service.js')
const userTasks = require('./user-tasks/user-tasks.service.js')
const swapTasks = require('./swap-tasks/swap-tasks.service.js')
const swapStages = require('./swap-stages/swap-stages.service.js')
const taskLogs = require('./task-logs/task-logs.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users)
  app.configure(projects)
  app.configure(members)
  app.configure(stages)
  app.configure(tasks)
  app.configure(userTasks)
  app.configure(swapTasks)
  app.configure(swapStages)
  app.configure(taskLogs);
}
