import typeToReducer from 'type-to-reducer'
import { REGISTER, LOGIN } from './../actions/auth-actions';

const INITIAL_STATE = {
  fetching: false,
  error: false,
  fetched: false,

  uid: null,
  token: null,
}

const reducerMap = {
  [REGISTER]: {
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
    })
  },
  [LOGIN]: {
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

      token: action.payload.data.token,
      uid: action.payload.data.uid,
    })
  }
}

export default typeToReducer(reducerMap, INITIAL_STATE)