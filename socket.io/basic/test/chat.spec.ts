import { expect } from 'chai'
import SocketIO, { Socket } from 'socket.io'
import ChatClient, { ChatClientOptions } from '../src/client'
import { PORT } from '../src/config'
import { NOT_AUTHORIZED_USER_ERROR_MESSAGE } from '../src/const'
import { start } from '../src/server'
import { delay } from '../src/utils'
import { createFakeToken } from './helpers'

describe('Chat', () => {
  const closers: Array<() => void> = []
  const chatClients: ChatClient[] = []

  function startSocketServer(port?: number): SocketIO.Server {
    const { io, close } = start(port)
    closers.push(close)
    return io
  }

  function createChatClient({ token = createFakeToken(), port }: ChatClientOptions = {}): ChatClient {
    const client = new ChatClient({ token, port })
    chatClients.push(client)
    return client
  }

  function addSocketIdGetter(io): Promise<string> {
    return new Promise(resolve => {
      io.on('connect', (socket: Socket) => {
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

    try {
      await createChatClient({ token: null }).onReady
      console.log('TEST FAILED!')
      expect(true).be.eql(false)
    } catch (ex) {
      expect(ex.message).to.eql(NOT_AUTHORIZED_USER_ERROR_MESSAGE)
    }

    const onConnected = addSocketIdGetter(io)
    const validTokenClient = createChatClient()
    const [ socketId ] = await Promise.all([ onConnected, validTokenClient.onReady ])
    expect(socketId).to.eql(validTokenClient.id)
  })

  describe('Between servers', () => {
    async function setupTest() {
      const PORTS = [ PORT, PORT + 1 ]
      const [ io1, io2 ] = PORTS.map(port => startSocketServer(port))
      const [ u1, u2 ] = PORTS.map(port => createChatClient({ port }))
      await Promise.all([ u1, u2 ].map(socket => socket.onReady))
      return { io1, io2, u1, u2, users: [ u1, u2 ] }
    }

    it('users are separated.', async () => {
      const { io1, io2, u1, u2, users } = await setupTest()

      io1.local.emit('msg', 'IO1')
      io2.local.emit('msg', 'IO2')

      await delay(300)

      io1.emit('msg', 'ALL1')
      await delay(100)
      io2.emit('msg', 'ALL2')
      await delay(500)

      expect(u1.messages[ 0 ]).to.eql('IO1')
      expect(u2.messages[ 0 ]).to.eql('IO2')

      users.map(u => {
        expect(u.messages[ 1 ]).to.eql('ALL1')
        expect(u.messages[ 2 ]).to.eql('ALL2')
      })
    })
  })
})
