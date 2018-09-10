import { PORT } from './config'
import debug from 'debug'
import SocketIO, { EngineSocket } from 'socket.io'

const logger = debug('socket:basic')

export function start(port: number = PORT): { io: SocketIO.Server, close: () => void } {
  const io: SocketIO.Server = SocketIO(PORT)

  io.on('connection', (socket: EngineSocket) => {
    socket.emit('connected', socket.id)

    socket.on('private message', msg => {
      logger('I received a private message by ', socket.id, ' saying ', msg)
    })

    socket.on('disconnect', () => {
      logger('======== SVR: USER DISCONNECTED :', socket.id)
    })
  })

  return {
    io,
    close: () => io.close(),
  }
}
