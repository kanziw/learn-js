import { expect } from 'chai'
import SocketIO, { EngineSocket } from 'socket.io'
import { start } from '../src'
import ChatClient from '../src/client/ChatClient'

describe('Chat', () => {
  const closers: (() => void)[] = []
  const chatClients: ChatClient[] = []

  function startSocketServer(): SocketIO.Server {
    const { io, close } = start()
    closers.push(close)
    return io
  }

  function createChatClient(): ChatClient {
    const client = new ChatClient()
    chatClients.push(client)
    return client
  }

  function createChatClients(num: number = 1): ChatClient[] {
    const clients: ChatClient[] = []
    for (let i = 0; i < num; i++) {
      clients.push(createChatClient())
    }
    return clients
  }

  afterEach(() => {
    chatClients.splice(0).forEach(c => c.close())
    closers.splice(0).forEach(closer => closer())
  })

  it('Connection', async () => {
    const io = startSocketServer()

    const onConnected = new Promise(resolve => {
      io.on('connect', (socket: EngineSocket) => {
        resolve(socket.id)
      })
    })

    const [ u ] = createChatClients(1)
    const [ socketId ] = await Promise.all([ onConnected, u.onReady ])
    expect(u.id).to.eql(socketId)
  })
})
