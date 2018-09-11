import debug from 'debug'
import SocketIOClient from 'socket.io-client'
import { HOST, PORT } from '../config'
import { NOT_AUTHORIZED_USER_ERROR_MESSAGE } from '../const'
import { Commands, SocketConnectedResponse } from '../interface'

export default class ChatClient {
  public id: string
  public onReady: Promise<void>
  public messages: any[]
  private readonly token: string | null
  private readonly socket: SocketIOClient.Socket
  private logger: debug.IDebugger

  constructor({ token = null, port = PORT }: ChatClientOptions = {}) {
    this.token = token
    this.socket = SocketIOClient(`http://${HOST}:${port}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': this.token,
          },
        },
      },
    })

    this.addHandlers()
    this.messages = []
  }

  public close(): void {
    this.socket.close()
  }

  private addHandlers(): void {
    this.addAuthHandler()
    this.socket.on('error', err => {
      if (err !== NOT_AUTHORIZED_USER_ERROR_MESSAGE && (err && err.message !== 'xhr poll error')) {
        this.logger(err)
      }
    })

    // for test case
    this.socket.on('msg', data => {
      this.messages.push(data)
    })
  }

  private addAuthHandler(): void {
    this.onReady = new Promise((resolve, reject) => {
      this.socket.on(Commands.Connected, ({ id }: SocketConnectedResponse) => {
        this.id = id
        this.logger = debug(`socket:client:${id}`)
        resolve()
      })

      this.socket.on('error', err => {
        if (err === NOT_AUTHORIZED_USER_ERROR_MESSAGE) {
          reject(new Error(err))
        }
      })
    })
  }
}

export interface ChatClientOptions {
  token?: string | null
  port?: number
}
