import { SERVER } from './env-config'
import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const options = {
  storage: window.localStorage
}
const socket = io(SERVER)
const app = feathers()

app.configure(socketio(socket))
app.configure(auth(options))

export default app
