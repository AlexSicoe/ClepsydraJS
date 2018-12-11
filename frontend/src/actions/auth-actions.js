import axios from 'axios'

const SERVER = 'http://localhost:4000'
const ADMIN = `${SERVER}/admin`
const AUTH = `${SERVER}/auth`
const API = `${SERVER}/api`

const SCOPE = 'AUTH::'
export const REGISTER = `${SCOPE}REGISTER`
export const LOGIN = `${SCOPE}LOGIN`

export const register = (credentials) => ({
  type: REGISTER,
  payload: axios.post(`${ADMIN}/register`, credentials),
  meta: {
    globalMessage: true
  }
})

export const login = (credentials) => ({
  type: LOGIN,
  payload: axios.post(`${AUTH}/login`, credentials),
  meta: {
    globalMessage: true
  }
})

