import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import { REGISTER, LOGIN } from './../actions/auth-actions';

const INITIAL_STATE = {
  error: null,
  fetching: false,
  fetched: false,

  uid: null,
  token: null,
  message: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER + '_' + PENDING:
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false,
      }
    case REGISTER + '_' + FULFILLED:
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,

        // message: action.payload.data.message,
      }
    case REGISTER + '_' + REJECTED:
      return {
        ...state,
        // message: action.payload.response.data.message,
        error: action.payload,
        fetching: false,
        fetched: false,
      }


    case LOGIN + '_' + PENDING:
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false,
      }
    case LOGIN + '_' + FULFILLED:
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,

        token: action.payload.data.token,
        uid: action.payload.data.uid,
        // message: action.payload.data.message,
      }

    case LOGIN + '_' + REJECTED:
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,
        // message: action.payload.response.data.message,
      }


    default:
      return state
  }
}