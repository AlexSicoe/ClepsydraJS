// @flow
import axios from 'axios'
import { socket } from './socket-actions'

const API = 'http://localhost:4000/api'
export const PROJECT$SELECT = 'PROJECT::SELECT'
export const PROJECT$UPSERT = 'PROJECT::UPSERT'
export const PROJECT$DESTROY = 'PROJECT::DESTROY'

export const PROJECT$FETCH = 'PROJECT::FETCH'
export const PROJECT$POST = 'PROJECT::POST'
export const PROJECT$PUT = 'PROJECT::PUT'
export const PROJECT$DELETE = 'PROJECT::DELETE'
export const PROJECT$ADD_USER = 'PROJECT::ADD_USER'
export const PROJECT$REMOVE_USER = 'PROJECT::REMOVE_USER'



export const selectProject = (pid) => ({
  type: PROJECT$SELECT,
  payload: pid,
})

export const upsertProject = (payload) => ({
  type: PROJECT$UPSERT,
  payload
})

export const destroyProject = (pid) => ({
  type: PROJECT$DESTROY,
  payload: pid
})

export const fetchProject = (pid, token) => async (dispatch) => {
  try {
    const res = await dispatch({
      type: PROJECT$FETCH,
      payload: axios.get(`${API}/projects/${pid}`, { headers: { token } }),
      meta: { globalMessage: true }
    })
    const project = res.action.payload.data
    dispatch(upsertProject(project))
    // emitClientInfo(id)
    socket.on('projectFetched', p => dispatch(upsertProject(p)))
  } catch (err) {
    console.log(err)
  }

}

export const postProject = (uid, project, token) => ({
  type: PROJECT$POST,
  payload: axios.post(`${API}/users/${uid}/projects`, project, { headers: { token } }),
  meta: { globalMessage: true }
})

export const putProject = (pid, project, token) => ({
  type: PROJECT$PUT,
  payload: axios.put(`${API}/projects/${pid}`, project, { headers: { token } }),
  meta: { globalMessage: true }
})

export const deleteProject = (pid, token) => ({
  type: PROJECT$DELETE,
  payload: axios.delete(`${API}/projects/${pid}`, { headers: { token } }),
  meta: { globalMessage: true }
})

export const addUserToProject = (pid, mailOrName, token) => ({
  type: PROJECT$ADD_USER,
  payload: axios.post(`${API}/projects/${pid}/users`, { mailOrName }, { headers: { token } }),
  meta: { globalMessage: true }
})

export const removeUserFromProject = (pid, uid, token) => ({
  type: PROJECT$REMOVE_USER,
  payload: axios.delete(`${API}/projects/${pid}/users/${uid}`, { headers: { token } }),
  meta: { globalMessage: true }
})


