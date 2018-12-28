import { PROJECT$SELECT } from "../actions/project-actions"

const INITIAL_STATE = {
  selected: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT$SELECT:
      return {
        ...state,
        selected: action.payload
      }
    default:
      return state
  }
}