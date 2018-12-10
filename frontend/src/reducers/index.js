import { combineReducers } from 'redux'
import user from './user-reducer'
import projects from './projects-reducer'
import { RESET_APP } from './../actions/root-actions';

const appReducer = combineReducers({
  user, projects
})

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer