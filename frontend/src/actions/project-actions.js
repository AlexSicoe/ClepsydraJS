import axios from 'axios'

const API = 'http://localhost:4000/api'

const SCOPE = 'PROJECT::'
export const FETCH = `${SCOPE}FETCH`
export const FETCH_ALL_FROM_USER = `${SCOPE}FETCH_ALL_FROM_USER`
export const POST = `${SCOPE}POST`

export const fetchProject = (pid, token) => ({
  type: FETCH,
  payload: axios.get(`${API}/projects/:${pid}`, { headers: { token } }),
  meta: { globalMessage: true }
})

export const fetchProjectsOfUser = (uid, token) => ({
  type: FETCH_ALL_FROM_USER,
  payload: axios.get(`${API}/users/${uid}/projects`, { headers: { token } }),
  meta: { globalMessage: true }
})

export const postProject = (uid, project, token) => ({
  type: POST,
  payload: axios.post(`${API}/users/${uid}/projects`, project, { headers: { token } }),
  meta: { globalMessage: true }
})