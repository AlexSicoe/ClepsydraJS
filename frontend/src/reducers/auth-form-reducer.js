import { SET_USERNAME, SET_PASSWORD, SET_EMAIL } from "../actions/auth-form-actions";


const INITIAL_STATE = {
  username: '',
  password: '',
  email: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      }
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    default:
      return state
  }
}