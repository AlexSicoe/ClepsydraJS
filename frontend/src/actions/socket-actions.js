import socketIOClient from 'socket.io-client'
const path = 'http://localhost:4000'
export const socket = socketIOClient(path)

export const emitClientInfo = (uid) => socket.emit('storeClientInfo', uid)