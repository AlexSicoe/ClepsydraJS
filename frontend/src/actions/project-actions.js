import axios from 'axios'

const API = 'http://localhost:4000/api'

export const fetchProject = (pid, token) => ({
  type: 'FETCH_PROJECT',
  payload: axios.get(`${API}/projects/:${pid}`, { headers: { token } })
})

export const fetchProjectsOfUser = (uid, token) => ({
  type: 'FETCH_PROJECTS_OF_USER',
  payload: axios.get(`${API}/users/${uid}/projects`, { headers: { token } })
})

export const postProject = (uid, project, token) => ({
  type: 'POST_PROJECT',
  payload: axios.post(`${API}/users/${uid}/projects`, project, { headers: { token } })
})