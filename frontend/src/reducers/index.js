import { combineReducers } from 'redux'
import user from './user-reducer'
import projects from './projects-reducer'

export default combineReducers({
  user, projects
})
