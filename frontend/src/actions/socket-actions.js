import socketIOClient from 'socket.io-client'
import notify from '../components/view/notify'
import { NOTIFICATION } from '../utils/events'

const path = 'http://localhost:4000'

export const socket = socketIOClient(path)

export function handleSocketsOnLogin(uid) {
  socket.emit('login', uid)
  socket.on(NOTIFICATION, notification => notify(notification))
}

export function handleSocketsOnLogout() {
  socket.emit('logout')
}