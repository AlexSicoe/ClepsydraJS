import axios from 'axios'

const API = 'http://localhost:4000/api'

export const getProject = (project, pid) => ({
  type: 'GET_PROJECT',
  payload: axios.get(`${API}/projects/:${pid}`)
})

export const getProjectsOfUser = (project, uid) => ({
  type: 'GET_PROJECTS_OF_USER',
  payload: axios.get(`${API}/users/${uid}/projects`)
})

export const postProject = (project, uid) => ({
  type: 'POST_PROJECT',
  payload: axios.post(`${API}/users/${uid}/projects`, project)
})