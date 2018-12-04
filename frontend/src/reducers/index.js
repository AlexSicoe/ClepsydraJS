import { combineReducers } from 'redux'
import user from './user-reducer'
import project from './project-reducer'

export default combineReducers({
  user, project
})
