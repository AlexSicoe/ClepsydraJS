import isPromise from 'is-promise'

export default () => next => action => {
  if (!isPromise(action.payload)) {
    return next(action)
  }

  if (action.meta.globalError === true) {
    //TODO show error in modal 
    return next(action).catch(error => {
      console.warn(`Global error: ${error}.`)
      return error
    })
  }

  return next(action)
}