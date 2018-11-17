/* tslint:disable */

export interface LogUserInVariables {
  userName: string
  token: string
}

export interface Credential extends LogUserInVariables {
  expireAt: number
}
