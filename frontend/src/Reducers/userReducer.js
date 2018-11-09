export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}