import { SERVER } from './env-config'
import feathers from '@feathersjs/feathers'
// import auth from '@feathersjs/authentication'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io(SERVER)
const app = feathers()

app.configure(socketio(socket))
// app.configure(auth())

export default app
