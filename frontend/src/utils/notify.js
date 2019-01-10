import toastr from 'toastr'

export default function notify(notification) {
  if (!notification) {
    return
  }
  let { title, body, icon } = notification
  switch (icon) {
    case 'success':
      toastr.success(body, title)
      break
    case 'info':
      toastr.info(body, title)
      break
    case 'warning':
      toastr.warning(body, title)
      break
    case 'error':
      toastr.error(body, title)
      break
    default: console.error('Unknown notification type!')
  }
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