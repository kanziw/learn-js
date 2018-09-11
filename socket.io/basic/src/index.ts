import { PORT } from './config'
import { SocketConnectedResponse } from './interface'
import { start } from './server'

start(PORT)

export { SocketConnectedResponse }
