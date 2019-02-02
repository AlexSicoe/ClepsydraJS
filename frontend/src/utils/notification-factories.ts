import notify, { Notification } from '../components/view/notify'
import { AxiosResponse, AxiosError } from 'axios'

export const networkErrorNotification: Notification = {
  title: 'Network:',
  icon: 'error',
  body: 'The hamsters ran into trouble'
}

export function notifyError(error: AxiosError) {
  console.error(error)
  const { response } = error
  if (response) {
    notify({
      title: 'Server:',
      icon: 'error',
      body: response.data.message
    })
  } else {
    notify(networkErrorNotification)
  }
}

export function notifySuccess(response: AxiosResponse) {
  notify({
    title: 'Server:',
    icon: 'success',
    body: response.data.message
  })
}
