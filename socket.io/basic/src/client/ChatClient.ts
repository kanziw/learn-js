import SocketIOClient from 'socket.io-client'
import { HOST, PORT } from '../config'

export default class ChatClient {
  public id: string
  public onReady: Promise<string>
  private readonly socket: SocketIOClient.Socket

  constructor() {
    this.socket = SocketIOClient(`http://${HOST}:${PORT}`)
    this.addHandlers()
  }

  public close() {
    this.socket.close()
  }

  private addHandlers() {
    this.onReady = new Promise(resolve => {
      this.socket.on('connected', socketId => {
        this.id = socketId
        resolve()
      })
    })

    this.socket.emit('private message', { a: 'hello?' })
  }
}
