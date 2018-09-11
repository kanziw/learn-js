import uuid from 'uuid/v4'
import { createJWT } from '../src/utils'

export function createFakeToken(): string {
  return createJWT(uuid())
}
