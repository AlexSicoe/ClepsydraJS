//@flow

import { Model, attr, fk, oneToOne, many } from 'redux-orm'

export class User extends Model { }
User.modelName = 'User'
User.fields = {
  id: attr(),
  username: attr(),
  project: many({
    to: 'Project',
    relatedName: 'users',
    // through: 'ProjectUser',
  })
}

export class Project extends Model { }
Project.modelName = 'Project'
Project.fields = {
  id: attr(),
  name: attr(),
  user: many({
    to: 'User',
    relatedName: 'projects',
    // through: 'ProjectUser'
  })
}

export class Sprint extends Model { }
Sprint.modelName = 'Sprint'
Sprint.fields = {
  id: attr(),
  name: attr(),
  project: fk('Project', 'sprints')

}

export class Stage extends Model { }
Stage.modelName = 'Stage'
Stage.fields = {
  id: attr(),
  name: attr(),
  sprint: fk('Sprint', 'stages')
}

export class Task extends Model { }
Task.modelName = 'Task'
Task.fields = {
  id: attr(),
  name: attr(),
  user: fk('User'),
  project: fk('Project', 'tasks'),
  stage: fk('Stage', 'tasks')
}