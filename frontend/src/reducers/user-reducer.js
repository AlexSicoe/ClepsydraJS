const INITIAL_STATE = {
  username: null,
  password: null,
  email: null,
  fetching: false,
  fetched: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.password }
    case 'SET_EMAIL':
      return { ...state, email: action.email }
    default:
      return state
  }
}