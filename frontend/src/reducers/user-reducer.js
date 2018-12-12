import typeToReducer from 'type-to-reducer';
import { FETCH } from './../actions/user-actions';

const INITIAL_STATE = {
  fetching: false,
  error: false,
  fetched: false,

  username: null,
  email: null,
  uid: null,
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

        username: action.payload.data.username,
        email: action.payload.data.email,
        uid: action.payload.data.uid,
      })
  },
}
export default typeToReducer(reducerMap, INITIAL_STATE)
