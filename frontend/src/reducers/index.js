import { combineReducers } from 'redux'
import auth from './auth-reducer'
import { RESET_APP } from '../actions/root-actions';
import entities from '../redux-orm/entities-reducer'
import project from './project-reducer'


const appReducer = combineReducers({
  auth,
  entities,
  project,
})

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer