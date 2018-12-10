import axios from 'axios'

const API = 'http://localhost:4000/api'

const FETCH = 'PROJECT::FETCH'
const FETCH_ALL_FROM_USER = 'PROJECT::FETCH_ALL_FROM_USER'
const POST = 'PROJECT::POST'

export const fetchProject = (pid, token) => ({
  type: FETCH,
  payload: axios.get(`${API}/projects/:${pid}`, { headers: { token } })
})

export const fetchProjectsOfUser = (uid, token) => ({
  type: FETCH_ALL_FROM_USER,
  payload: axios.get(`${API}/users/${uid}/projects`, { headers: { token } })
})

export const postProject = (uid, project, token) => ({
  type: POST,
  payload: axios.post(`${API}/users/${uid}/projects`, project, { headers: { token } })
})