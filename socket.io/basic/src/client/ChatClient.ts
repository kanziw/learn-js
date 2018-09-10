import SocketIOClient from 'socket.io-client'
import { HOST, PORT } from '../config'

export default class ChatClient {
  public id: string
  public onReady: Promise<void>
  private readonly token: string | null
  private readonly socket: SocketIOClient.Socket

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
  }

  private addAuthHandler(): void {
    this.onReady = new Promise((resolve, reject) => {
      this.socket.on('connected', socketId => {
        this.id = socketId
        resolve()
      })

      this.socket.on('error', err => {
        if (err === 'Not authorized user!') {
          reject(new Error(err))
        }
      })
    })
  }
}

export interface ChatClientOptions {
  token?: string | null
}
