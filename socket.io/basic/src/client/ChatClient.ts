import debug from 'debug'
import SocketIOClient from 'socket.io-client'
import { HOST, PORT } from '../config'
import { NOT_AUTHORIZED_USER_ERROR_MESSAGE } from '../const'

export default class ChatClient {
  public id: string
  public onReady: Promise<void>
  private readonly token: string | null
  private readonly socket: SocketIOClient.Socket
  private logger: debug.IDebugger

  constructor({ token = null }: ChatClientOptions = {}) {
    this.token = token
    this.socket = SocketIOClient(`http://${HOST}:${PORT}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': this.token,
          },
        },
      },
    })

    this.addHandlers()
  }

  public close(): void {
    this.socket.close()
  }

  private addHandlers(): void {
    this.addAuthHandler()
    this.socket.on('error', err => {
      if (err !== NOT_AUTHORIZED_USER_ERROR_MESSAGE) {
        this.logger(err)
      }
    })
  }

  private addAuthHandler(): void {
    this.onReady = new Promise((resolve, reject) => {
      this.socket.on('connected', socketId => {
        this.id = socketId
        this.logger = debug(`socket:client:${socketId}`)
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
}
