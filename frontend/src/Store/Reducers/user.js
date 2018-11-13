export const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, name: action.username }
    default:
      return state
  }
}