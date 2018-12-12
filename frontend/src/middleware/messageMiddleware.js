import isPromise from 'is-promise'
import toastr from 'toastr'

const serverSays = 'Server says:';
export default () => next => async action => {
  if (!isPromise(action.payload)) {
    return next(action)
  }

  let { globalMessage } = action.meta
  if (globalMessage) {
    try {
      let res = await next(action)
      let message = res.action.payload.data.message
      if (message) {
        console.warn(`Message: ${message}`)
        toastr.success(message, serverSays)
      }
      return res
    } catch (e) {
      console.warn(`${e}.`)
      console.warn(`Message: ${e.response.data.message}`)
      toastr.error(e.response.data.message, serverSays)

      return e
    }
  }
  return next(action)
}

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": 150,
  "hideDuration": 500,
  "timeOut": 2500,
  "extendedTimeOut": 500,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
