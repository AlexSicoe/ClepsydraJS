const INITIAL_STATE = {
  error: null,
  fetching: false,
  fetched: false,

  // isAuthorized: false,
  username: '',
  password: '',
  email: '',
  token: '',

  message: null
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
    case 'CLEAR_MESSAGE':
      return {
        ...state,
        error: null,
        message: null,
      }

    case 'REGISTER_PENDING':
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false,
      }
    case 'REGISTER_FULFILLED':
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,

        message: action.payload.data.message,
      }
    case 'REGISTER_REJECTED':
      return {
        ...state,
        message: action.payload.response.data.message,
        error: action.payload,
        fetching: false,
        fetched: false,
      }


    case 'LOGIN_PENDING':
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false,
      }
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,

        token: action.payload.data.token,
        message: action.payload.data.message,
      }

    case 'LOGIN_REJECTED':
      return {
        ...state,
        message: action.payload.response.data.message,
        error: action.payload,
        fetching: false,
        fetched: false,
      }


    case 'GET_USER_PENDING':
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false,
      }
    case 'GET_USER_FULFILLED':
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,

        username: action.payload.data.username,
        password: action.payload.data.password, //TODO really? 
        email: action.payload.data.email,
        token: action.payload.data.token,
      }
    case 'GET_USER_REJECTED':
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,

        username: '',
        password: '',
        email: '',
        token: '',
      }

    default:
      return state
  }
}