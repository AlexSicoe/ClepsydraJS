import axios from 'axios'

const SERVER = 'http://localhost:4000'
const ADMIN = `${SERVER}/admin`
const AUTH = `${SERVER}/auth`
const API = `${SERVER}/api`


export const setUsername = (username) => ({
  type: 'SET_USERNAME',
  payload: username
})

export const setPassword = (password) => ({
  type: 'SET_PASSWORD',
  payload: password
})

export const setEmail = (email) => ({
  type: 'SET_EMAIL',
  payload: email
})

export const clearMessage = () => ({
  type: 'CLEAR_MESSAGE',
})

//requests
export const register = (credentials) => ({
  type: 'REGISTER',
  payload: axios.post(`${ADMIN}/register`, credentials)
})

export const login = (credentials) => ({
  type: 'LOGIN',
  payload: axios.post(`${AUTH}/login`, credentials)
})

export const logout = () => ({
  type: 'LOGOUT', //TODO logout from server as well
})

export const getUser = (id, token) => ({
  type: 'GET_USER',
  payload: axios.get(`${API}/users/${id}`, { headers: { token } })
})

export const putUser = (id, token) => ({
  type: 'PUT_USER',
  payload: axios.put(`${API}/users/${id}`, { headers: { token } })
})

export const deleteUser = (id, token) => ({
  type: 'DELETE_USER',
  payload: axios.delete(`${API}/users/${id}`, { headers: { token } })
})
