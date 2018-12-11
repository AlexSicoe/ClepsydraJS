import { FETCH } from './../actions/user-actions'
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'


const INITIAL_STATE = {
  error: null,
  fetching: false,
  fetched: false,

  username: null,
  email: '',

  uid: null,
  message: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH + PENDING:
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false,
      }
    case FETCH + FULFILLED:
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,

        username: action.payload.data.username,
        email: action.payload.data.email,
        uid: action.payload.data.uid,
      }
    case FETCH + REJECTED:
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,

        username: '',
        password: '',
        email: '',
      }

    default:
      return state
  }
}