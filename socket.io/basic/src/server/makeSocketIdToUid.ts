import SocketIO from 'socket.io'
import { decodeJWT } from '../utils'

export default function makeSocketIdToUid(io: SocketIO.Server) {
  // @ts-ignore
  const orgGenId = io.engine.generateId.bind(io.engine)
  // @ts-ignore
  io.engine.generateId = req => {
    try {
      return decodeJWT(req.headers.authorization).uid
    } catch (ex) {
      return orgGenId(req)
    }
  }
}
