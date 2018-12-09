const INITIAL_STATE = {
  error: null,
  fetching: false,
  fetched: false,

  id: null,
  name: '',


  message: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE':
      return {
        ...state,
        error: null,
        message: null,
      }
      
    case 'FETCH_PROJECT_PENDING':
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false,
      }
    case 'FETCH_PROJECT_FULFILLED':
      if (state.id !== action.payload.data.id) {
        return state
      }
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,

        id: action.payload.data.id,
        name: action.payload.data.name,
      }
    case 'FETCH_PROJECT_REJECTED':
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,

        id: null,
        name: '',
      }
    case 'POST_PROJECT_PENDING':
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false
      }
    case 'POST_PROJECT_FULFILLED':
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,

        message: action.payload.response.data.message
      }
    case 'POST_PROJECT_REJECTED':
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,
        message: action.payload.response.data.message,
      }
    default:
      return state
  }
} 