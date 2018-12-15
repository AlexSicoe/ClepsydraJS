import { combineReducers } from 'redux'
import auth from './auth-reducer'
import authForm from './auth-form-reducer'
import { RESET_APP } from './../actions/root-actions';
import orm from '../redux-orm/orm'
import { createReducer } from 'redux-orm'
import entities from '../redux-orm/entitiesReducer';


const appReducer = combineReducers({
  auth,
  authForm,
  entities
  // orm: createReducer(orm), //TODO test
})

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer