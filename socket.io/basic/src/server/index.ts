import debug from 'debug'
import SocketIO, { Socket } from 'socket.io'
import RedisForSocketCluster from 'socket.io-redis'
import { PORT, REDIS_HOST, REDIS_PORT } from '../config'
import { Commands, SocketConnectedResponse } from '../interface'
import { AuthMiddleware } from './middlewares'

const logger = debug('socket:svr')

export function start(port: number = PORT): { io: SocketIO.Server, close: () => void } {
  const io: SocketIO.Server = SocketIO(port)
  const adapterRedis = RedisForSocketCluster({ host: REDIS_HOST, port: REDIS_PORT })

  io.adapter(adapterRedis)
  io.use(AuthMiddleware)

  io.on('connection', (socket: Socket) => {
    socket.emit(Commands.Connected, { id: socket.id } as SocketConnectedResponse)

    socket.on('private message', msg => {
      logger('I received a private message by ', socket.id, ' saying ', msg)
    })

    socket.on('disconnect', () => {
      logger('USER DISCONNECTED :', socket.id)
    })
  })

  return {
    io,
    close: () => {
      adapterRedis.pubClient.end(false)
      adapterRedis.subClient.end(false)
      io.close()
    },
  }
}
