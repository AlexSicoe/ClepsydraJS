import axios from 'axios'

const API = 'http://localhost:4000/api'

export const getProject = (pid, token) => ({
  type: 'GET_PROJECT',
  payload: axios.get(`${API}/projects/:${pid}`, { headers: { token } })
})

export const getProjectsOfUser = (uid, token) => ({
  type: 'GET_PROJECTS_OF_USER',
  payload: axios.get(`${API}/users/${uid}/projects`, { headers: { token } })
})

export const postProject = (uid, project, token) => ({
  type: 'POST_PROJECT',
  payload: axios.post(`${API}/users/${uid}/projects`, project, { headers: { token } })
})