import isPromise from 'is-promise'
import notify from '../utils/notify'


const serverSays = 'Server says:';
export default () => next => async action => {
  if (!isPromise(action.payload)) {
    return next(action)
  }

  if (action.meta.globalMessage) {
    try {
      let res = await next(action)
      let { message } = res.action.payload.data

      if (message) {
        notify({
          title: serverSays,
          body: message,
          icon: 'success'
        })
      }

      return res
    } catch (e) {
      let { message } = e.response.data
      console.warn(`${e}.`)
      console.warn(`Message: ${message}`)
      notify({
        title: serverSays,
        body: message,
        icon: 'error'
      })
      return e
    }
  }
  return next(action)
}

