import typeToReducer from 'type-to-reducer';
import projectReducer from './project-reducer'
import { FETCH, FETCH_ALL_FROM_USER, POST } from './../actions/project-actions';

const INITIAL_STATE = {}

const reducerMap = {
  [FETCH]: {
    FULFILLED: (state, action) => {
      const { id, name } = action.payload.data
      return {
        ...state,
        [id]: {id, name}
      }
    },
    [FETCH_ALL_FROM_USER]: {
      FULFILLED: (state, action) => {
        const {projects} = action.payload.data
        state = {}
        for(p of projects) {
          state = {...state, [p.id]: p}
        }
        
        return state
    }
    },
  [POST]: {
    FULFILLED: (state, action) => [
      ...state, 
    ]
  }
}

export default typeToReducer(reducerMap, INITIAL_STATE)