import { expect } from 'chai'
import SocketIO, { EngineSocket } from 'socket.io'
import { start } from '../src/server'
import ChatClient, { ChatClientOptions } from '../src/client/ChatClient'
import { NOT_AUTHORIZED_USER_ERROR_MESSAGE } from '../src/const'

describe('Chat', () => {
  const closers: (() => void)[] = []
  const chatClients: ChatClient[] = []

  function startSocketServer(): SocketIO.Server {
    const { io, close } = start()
    closers.push(close)
    return io
  }

  function createChatClient({ token = null }: ChatClientOptions = {}): ChatClient {
    const client = new ChatClient({ token })
    chatClients.push(client)
    return client
  }

  function addSocketIdGetter(io): Promise<string> {
    return new Promise(resolve => {
      io.on('connect', (socket: EngineSocket) => {
        resolve(socket.id)
      })
    })
  }

  afterEach(() => {
    chatClients.splice(0).forEach(c => c.close())
    closers.splice(0).forEach(closer => closer())
  })

  it('Connection', async () => {
    const io = startSocketServer()
    const onConnected = addSocketIdGetter(io)

    const u = createChatClient()
    const [ socketId ] = await Promise.all([ onConnected, u.onReady ])
    expect(u.id).to.eql(socketId)
  })

  it('Authorization', async () => {
    const io = startSocketServer()
    const validToken = 'Bearer JWT_TOKEN_HERE!'

    io.use((socket, next) => {
      if (socket.request.headers.authorization === validToken) {
        next()
      } else {
        next(new Error(NOT_AUTHORIZED_USER_ERROR_MESSAGE))
      }
    })

    try {
      await createChatClient().onReady
      console.log('TEST FAILED!')
      expect(true).be.eql(false)
    } catch (ex) {
      expect(ex.message).to.eql(NOT_AUTHORIZED_USER_ERROR_MESSAGE)
    }

    const onConnected = addSocketIdGetter(io)
    const validTokenClient = createChatClient({ token: validToken })
    const [ socketId ] = await Promise.all([ onConnected, validTokenClient.onReady ])
    expect(socketId).to.eql(validTokenClient.id)
  })
})
