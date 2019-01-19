import axios from 'axios'
import { handleSocketsOnLogin } from './socket-actions';

const SERVER = 'http://localhost:4000'
const ADMIN = `${SERVER}/admin`
const AUTH = `${SERVER}/auth`

export const REGISTER = 'AUTH::REGISTER'
export const LOGIN = 'AUTH::LOGIN'

export const register = (credentials) => ({
  type: REGISTER,
  payload: axios.post(`${ADMIN}/register`, credentials),
  meta: { globalMessage: true }
})

export const login = (credentials) => async dispatch => {
  const res = await dispatch({
    type: LOGIN,
    payload: axios.post(`${AUTH}/login`, credentials),
    meta: { globalMessage: true }
  })
  if(res.action) {
  const { uid } = res.action.payload.data
  handleSocketsOnLogin(uid)
  } else {
    console.log('The hamsters are in trouble')
  }
}

