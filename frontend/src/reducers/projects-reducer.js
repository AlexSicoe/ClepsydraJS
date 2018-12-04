
import project from './project-reducer'
const INITIAL_STATE = {
  error: null,
  fetching: false,
  fetched: false,

  projects: [],
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
      
    case 'GET_PROJECT_PENDING':
    case 'GET_PROJECT_FULFILLED':
    case 'GET_PROJECT_REJECTED':
      return state.projects.map(p => project(p, action))

    case 'GET_PROJECTS_OF_USER_PENDING':
      return {
        ...state,
        error: null,
        fetching: true,
        fetched: false
      }
    case 'GET_PROJECTS_OF_USER_FULFILLED':
      return {
        ...state,
        error: null,
        fetching: false,
        fetched: true,
        projects: action.payload.data//TODO test
      }
    case 'GET_PROJECTS_OF_USER_REJECTED':
      return {
        ...state,
        error: action.payload,
        fetching: false,
        fetched: false,
      }

    case 'POST_PROJECT_PENDING':
    case 'POST_PROJECT_FULFILLED':
    case 'POST_PROJECT_REJECTED':
      return {
        ...state,
        projects: [
          ...state.projects,
          project(undefined, action) //TODO test
        ]
      }


    default:
      return state
  }
}