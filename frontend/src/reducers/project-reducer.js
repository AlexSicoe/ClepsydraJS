const INITIAL_STATE = {
  projects: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PROJECT':
      return { ...state } //TODO
    case 'GET_PROJECTS_OF_USER':
      return { ...state } //TODO
    case 'POST_PROJECT':
      return { ...state } //TODO

    default:
      return state
  }
}