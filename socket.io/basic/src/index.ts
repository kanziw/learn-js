import { PORT } from './config'
import SocketIO, { EngineSocket } from 'socket.io'

export function start(port: number = PORT): { io: SocketIO.Server, close: () => void } {
  const io: SocketIO.Server = SocketIO(PORT)

  io.on('connection', (socket: EngineSocket) => {
    socket.emit('connected', socket.id)

    socket.on('private message', msg => {
      console.log('I received a private message by ', socket.id, ' saying ', msg)
    })

    socket.on('disconnect', () => {
      console.log('======== SVR: USER DISCONNECTED :', socket.id)
    })
  })

  return {
    io,
    close: () => io.close(),
  }
}
