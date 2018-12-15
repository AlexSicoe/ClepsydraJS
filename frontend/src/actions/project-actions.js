//@flow
import axios from 'axios'

import type { _Project } from '../redux-orm/models'

const API: string = 'http://localhost:4000/api'
const SCOPE: string = 'PROJECT::'
export const CREATE: string = `${SCOPE}CREATE`
export const FETCH: string = `${SCOPE}FETCH`
export const FETCH_ALL_FROM_USER: string = `${SCOPE}FETCH_ALL_FROM_USER`
export const POST: string = `${SCOPE}POST`

export const createProject = (payload: *) => ({
  type: CREATE,
  payload
})

export const fetchProject = (pid: number, token: string) => async (dispatch: *) => {
  const res = await dispatch({
    type: FETCH,
    payload: axios.get(`${API}/projects/:${pid}`, { headers: { token } }),
    meta: { globalMessage: true }
  })
  dispatch(createProject(res.action.payload.data))
}

export const fetchProjectsFromUser = (uid: number, token: string) => async (dispatch: *) => {
  const res = await dispatch({
    type: FETCH_ALL_FROM_USER,
    payload: axios.get(`${API}/users/${uid}/projects`, { headers: { token } }),
    meta: { globalMessage: true }
  })
  const projects: Array<_Project> = res.action.payload.data
  projects.forEach(p => dispatch(createProject(p)))

}

export const postProject = (uid: number, project: *, token: string) => ({
  type: POST,
  payload: axios.post(`${API}/users/${uid}/projects`, project, { headers: { token } }),
  meta: { globalMessage: true }
})