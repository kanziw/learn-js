import { Credential, LogUserInVariables } from '../types/apiSelf'

const LOCAL_STORAGE_CRED_KEY = 'CredGithub'
const SECOND = 1000
const MINUTE = SECOND * 60
const EXPIRE_PERIOD = 30 * MINUTE

const generateCredential = ({ userName, token }: LogUserInVariables): string =>
  JSON.stringify({ userName, token, expireAt: Date.now() + EXPIRE_PERIOD })

const parseCredential = (credString: string | null): Credential | null => {
  try {
    const cred: Credential = JSON.parse(credString!)
    return cred.expireAt > Date.now() ? cred : null
  } catch (ex) {
    return null
  }
}

export const getToken = (): string => {
  try {
    return parseCredential(localStorage.getItem(LOCAL_STORAGE_CRED_KEY))!.token
  } catch (ex) {
    return ''
  }
}

export const generateAuthData = (isLoggedIn: boolean = Boolean(getToken())) =>
  ({ auth: { __typename: 'Auth', isLoggedIn } })

export const setUserCredential = (logUserInVariable: LogUserInVariables) =>
  localStorage.setItem(LOCAL_STORAGE_CRED_KEY, generateCredential(logUserInVariable))

export const removeUserCredential = () => localStorage.removeItem(LOCAL_STORAGE_CRED_KEY)
