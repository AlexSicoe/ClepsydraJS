import notify, { NotificationIcon } from '../components/view/notify'

export function notifyError(err: any) {
  console.error(err)
  notify({
    title: `${err.code} ${err.name}`,
    body: err.message,
    icon: NotificationIcon.Error
  })
}

export function notifySuccess(message: string) {
  notify({
    title: 'Success!',
    body: message,
    icon: NotificationIcon.Success
  })
}

export function notifyWarning(message: string) {
  notify({
    title: 'Warning!',
    body: message,
    icon: NotificationIcon.Warning
  })
}

export function notifyInfo(message: string) {
  notify({
    title: 'Info',
    body: message,
    icon: NotificationIcon.Info
  })
}
