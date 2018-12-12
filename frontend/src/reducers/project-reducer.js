import typeToReducer from 'type-to-reducer'
import { FETCH, POST } from './../actions/project-actions'

const INITIAL_STATE = {
  fetching: false,
  error: false,
  fetched: false,

  id: null,
  name: null,
}

const reducerMap = {
  [FETCH]: {
    PENDING: (state, action) => ({
      ...state,
      fetching: true,
      error: false,
      fetched: false,
    }),
    REJECTED: (state, action) => ({
      ...state,
      fetching: false,
      error: true,
      fetched: false,
    }),
    FULFILLED: (state, action) =>
      state.id !== action.payload.data.id ? state : ({
        ...state,
        fetching: false,
        error: false,
        fetched: true,

        id: action.payload.data.id,
        name: action.payload.data.name,
      })
  },
  [POST]: {
    PENDING: (state, action) => ({
      ...state,
      fetching: true,
      error: false,
      fetched: false,
    }),
    REJECTED: (state, action) => ({
      ...state,
      fetching: false,
      error: true,
      fetched: false,
    }),
    FULFILLED: (state, action) => ({
      ...state,
      fetching: false,
      error: false,
      fetched: true,
      //TODO?
    })
  }
}
export default typeToReducer(reducerMap, INITIAL_STATE)

