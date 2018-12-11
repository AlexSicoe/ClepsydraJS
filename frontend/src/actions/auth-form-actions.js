
const SCOPE = 'AUTH_FORM::'
export const SET_USERNAME = `${SCOPE}SET_USERNAME`
export const SET_PASSWORD = `${SCOPE}SET_PASSWORD`
export const SET_EMAIL = `${SCOPE}SET_EMAIL`


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

