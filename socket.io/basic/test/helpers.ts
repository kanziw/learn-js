import SocketIO from 'socket.io'
import uuid from 'uuid/v4'
import { createJWT, decodeJWT } from '../src/utils'

export function createFakeToken(): string {
  return createJWT(uuid())
}

export function makeSocketIdToUid(io: SocketIO.Server) {
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
