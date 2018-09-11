import { Socket } from 'socket.io'
import { decodeJWT } from '../utils'

export function AuthMiddleware(socket: Socket, next: SocketMiddlewareNextFunction): void {
  try {
    const { uid } = decodeJWT(socket.handshake.headers.authorization)
    socket.request.uid = uid
    next()
  } catch (ex) {
    next(ex)
  }
}

type SocketMiddlewareNextFunction = (err?: any) => void
