import axios from 'axios'

const API = 'http://localhost:4000/api'
const SCOPE = 'USER::'
export const FETCH = `${SCOPE}FETCH`
export const PUT = `${SCOPE}PUT`
export const DELETE = `${SCOPE}DELETE`

export const fetchUser = (id, token) => ({
  type: FETCH,
  payload: axios.get(`${API}/users/${id}`, { headers: { token } }),
  meta: {
    globalMessage: true
  }
})

export const putUser = (id, data, token) => ({
  type: PUT,
  payload: axios.put(`${API}/users/${id}`, data, { headers: { token } }),
  meta: {
    globalMessage: true
  }
})

export const deleteUser = (id, token) => ({
  type: DELETE,
  payload: axios.delete(`${API}/users/${id}`, { headers: { token } }),
  meta: {
    globalMessage: true
  }
})