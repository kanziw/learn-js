/* tslint:disable */

export interface Auth_auth {
  __typename: 'Auth'
  isLoggedIn: boolean
}

export interface Auth {
  auth: Auth_auth
}

export interface LogUserInVariables {
  userName: string
  token: string
}

export interface Credential extends LogUserInVariables {
  expireAt: number
}
