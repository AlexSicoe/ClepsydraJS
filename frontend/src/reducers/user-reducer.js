const INITIAL_STATE = {
  username: null,
  password: null,
  email: null,
  error: null,
  fetching: false,
  fetched: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload
      }
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload
      }
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      }
    case 'GET_USER_PENDING':
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false
      }
    case 'GET_USER_FULLFILLED':
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,
        user: action.payload.data
      }
    case 'GET_USER_REJECTED':
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,
        user: null
      }
    default:
      return state
  }
}