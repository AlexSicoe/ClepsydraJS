import axios from 'axios'
import { createProject } from './project-actions';

const API = 'http://localhost:4000/api'
export const USER$CREATE = 'USER::CREATE'
export const USER$UPDATE = 'USER::UPDATE'
export const USER$REMOVE = 'USER::REMOVE'
export const USER$ADD_PROJECT = 'USER::ADD_PROJECT'
export const USER$REMOVE_PROJECT = 'USER::REMOVE_PROJECT'

export const USER$FETCH = 'USER::FETCH'
export const USER$PUT = 'USER::PUT'
export const USER$DELETE = 'USER::DELETE'

export const createUser = (payload) => ({
  type: USER$CREATE,
  payload
})

export const addProjectToUser = (uid, project) => ({
  type: USER$ADD_PROJECT,
  payload: { uid, project }
})

export const fetchUser = (id, token) => async dispatch => {
  const res = await dispatch({
    type: USER$FETCH,
    payload: axios.get(`${API}/users/${id}`, { headers: { token, authId: id } }),
    meta: { globalMessage: true }
  })
  const user = res.action.payload.data
  dispatch(createUser(user))
}

export const putUser = (id, data, token) => ({
  type: USER$PUT,
  payload: axios.put(`${API}/users/${id}`, data, { headers: { token } }),
  meta: {
    globalMessage: true
  }
})

export const deleteUser = (id, token) => ({
  type: USER$DELETE,
  payload: axios.delete(`${API}/users/${id}`, { headers: { token } }),
  meta: {
    globalMessage: true
  }
})