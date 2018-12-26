import isPromise from 'is-promise'
import toastr from 'toastr'

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
        console.warn(`Message: ${message}`)
        toastr.success(message, serverSays)
      }
      return res
    } catch (e) {
      let { message } = e.response.data
      console.warn(`${e}.`)
      console.warn(`Message: ${message}`)
      toastr.error(message, serverSays)
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
  "positionClass": "toast-bottom-right",
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
