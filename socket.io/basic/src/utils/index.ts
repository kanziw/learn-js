import Promise from 'bluebird'
import jwt from 'jsonwebtoken'
import { NOT_AUTHORIZED_USER_ERROR_MESSAGE } from '../const'

export function delay(ms: number): Promise<void> {
  return Promise.delay(ms)
}

const JWT_TOKEN = process.env.JWT_TOKEN || 'TEST_TOKEN'

export function createJWT(uid: string): string {
  return jwt.sign(
    {
      uid,
    },
    JWT_TOKEN,
  )
}

export function decodeJWT(token: string): JWTTokenData {
  try {
    return jwt.verify(token, JWT_TOKEN) as JWTTokenData
  } catch (error) {
    throw new Error(NOT_AUTHORIZED_USER_ERROR_MESSAGE)
  }
}

interface JWTTokenData {
  uid: string
}

