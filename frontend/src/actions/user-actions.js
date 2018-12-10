import axios from 'axios'

const API = 'http://localhost:4000/api'


const FETCH_USER = 'USER::FETCH'
const PUT_USER = 'USER::PUT'
const DELETE_USER = 'USER::DELETE'


export const fetchUser = (id, token) => ({
    type: FETCH_USER,
    payload: axios.get(`${API}/users/${id}`, { headers: { token } })
})

export const putUser = (id, data, token) => ({
    type: PUT_USER,
    payload: axios.put(`${API}/users/${id}`, data, { headers: { token } })
})

export const deleteUser = (id, token) => ({
    type: DELETE_USER,
    payload: axios.delete(`${API}/users/${id}`, { headers: { token } })
})