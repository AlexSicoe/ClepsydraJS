import typeToReducer from 'type-to-reducer';
import project from './project-reducer'
import { FETCH, FETCH_ALL_FROM_USER, POST } from './../actions/project-actions';

const INITIAL_STATE = []

const reducerMap = {
  [FETCH]: {
    FULFILLED: (state, action) =>
      state.map(p => project(p, action))
  },
  [FETCH_ALL_FROM_USER]: {
    FULFILLED: (state, action) =>
      state = action.payload.data //TODO test
  },
  [POST]: {
    FULFILLED: (state, action) => [
      ...state,
      project(undefined, action)
    ]
  }
}

export default typeToReducer(reducerMap, INITIAL_STATE)