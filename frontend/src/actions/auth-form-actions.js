const SET_USERNAME = 'AUTH_FORM::SET_USERNAME'
const SET_PASSWORD = 'AUTH_FORM::SET_PASSWORD'
const SET_EMAIL = 'AUTH_FORM::SET_EMAIL'


export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: username
})


export const setPassword = (password) => ({
  type: SET_PASSWORD,
  payload: password
})


export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email
})

