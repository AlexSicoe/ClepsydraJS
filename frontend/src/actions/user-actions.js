import axios from 'axios'
import { socket } from './socket-actions'
import { USER, USER_DELETED } from '../utils/events'
import { resetApp } from './root-actions';

const API = 'http://localhost:4000/api'
export const USER$SELECT = 'USER::SELECT'
export const USER$UPSERT = 'USER::UPSERT'
export const USER$DESTROY = 'USER::DESTROY'

export const USER$FETCH = 'USER::FETCH'
export const USER$PUT = 'USER::PUT'
export const USER$DELETE = 'USER::DELETE'


export const selectUser = (uid) => ({
  type: USER$SELECT,
  payload: uid
})

export const upsertUser = (payload) => ({
  type: USER$UPSERT,
  payload
})

export const destroyUser = (uid) => ({
  type: USER$DESTROY,
  payload: uid
})

export const fetchUser = (id, token) => async dispatch => {
  const res = await dispatch({
    type: USER$FETCH,
    payload: axios.get(`${API}/users/${id}`, { headers: { token } }),
    meta: { globalMessage: true }
  })
  const user = res.action.payload.data
  dispatch(upsertUser(user))
  socket.on(USER, (user) => dispatch(upsertUser(user)))
  socket.on(USER_DELETED, () => dispatch(resetApp()))
}

export const putUser = (id, data, token) => ({
  type: USER$PUT,
  payload: axios.put(`${API}/users/${id}`, data, { headers: { token } }),
  meta: { globalMessage: true }
})

export const deleteUser = (id, token) => ({
  type: USER$DELETE,
  payload: axios.delete(`${API}/users/${id}`, { headers: { token } }),
  meta: { globalMessage: true }
})