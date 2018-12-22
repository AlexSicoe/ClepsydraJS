// @flow
import axios from 'axios'

import { addProjectToUser } from './user-actions';

const API = 'http://localhost:4000/api'
export const PROJECT$CREATE = 'PROJECT::CREATE'
export const PROJECT$FETCH = 'PROJECT::FETCH'
export const PROJECT$FETCH_ALL_FROM_USER = 'PROJECT::FETCH_ALL_FROM_USER'
export const PROJECT$POST = 'PROJECT::POST'

export const createProject = (payload) => ({
  type: PROJECT$CREATE,
  payload
})


export const fetchProject = (pid, token) => async (dispatch) => {
  const res = await dispatch({
    type: PROJECT$FETCH,
    payload: axios.get(`${API}/projects/:${pid}`, { headers: { token } }),
    meta: { globalMessage: true }
  })
  dispatch(createProject(res.action.payload.data))
}

export const fetchProjectsFromUser = (uid, token) => async (dispatch) => {
  const res = await dispatch({
    type: PROJECT$FETCH_ALL_FROM_USER,
    payload: axios.get(`${API}/users/${uid}/projects`, { headers: { token } }),
    meta: { globalMessage: true }
  })
  const projects: Array<*> = res.action.payload.data
  projects.forEach(p => {
    dispatch(createProject(p))
    // dispatch(addProjectToUser(uid, p))
  })
}



export const postProject = (uid, project, token) => ({
  type: PROJECT$POST,
  payload: axios.post(`${API}/users/${uid}/projects`, project, { headers: { token } }),
  meta: { globalMessage: true }
})