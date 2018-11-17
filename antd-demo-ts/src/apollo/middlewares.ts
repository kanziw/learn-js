import { ApolloLink, NextLink, Operation } from 'apollo-link'
import { IContext } from '../types'
import { getToken } from '../utils/credential'

export const authMiddleware = new ApolloLink((operation: Operation, forward: NextLink) => {
  operation.setContext(({ headers = {} }: IContext) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
  }))

  return forward(operation)
})
