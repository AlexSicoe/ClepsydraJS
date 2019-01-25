import socketIOClient from 'socket.io-client'
import { NOTIFICATION } from '../../utils/events';
import notify, { Notification } from '../../components/view/notify';
import { SERVER } from './../../env-config';


const socket = socketIOClient(SERVER)

export function handleSocketsOnLogin(uid: string) {
  socket.emit('login', uid)
  socket.on(NOTIFICATION, (n: Notification) => notify(n))
}

export function handleSocketsOnLogout() {
  socket.emit('logout')
}

export default socket