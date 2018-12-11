import isPromise from 'is-promise'

export default () => next => async action => {
  if (!isPromise(action.payload)) {
    return next(action)
  }

  if (action.meta.globalError === true) {
    //TODO show error in modal 
    try {
      await next(action)
    } catch (e) {
      console.warn(`${e}.`)
      console.warn(`Message: ${e.response.data.message}`)
      
      return e
    }
  }

  return next(action)
}