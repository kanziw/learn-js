import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost'
import { LogUserInVariables } from './types'
import { generateAuthData, getToken, removeUserCredential, setUserCredential } from './utils/credential'

interface IContext {
  cache: InMemoryCache
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  clientState: {
    defaults: { ...generateAuthData() },
    resolvers: {
      Mutation: {
        logUserIn: (_: any, logUserInVariable: LogUserInVariables, { cache }: IContext) => {
          setUserCredential(logUserInVariable)
          cache.writeData({ data: generateAuthData(true) })
          return null
        },
        logUserOut: (_: any, __: any, { cache }: IContext) => {
          removeUserCredential()
          cache.writeData({ data: generateAuthData(false) })
          return null
        },
      },
    },
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  },
  uri: 'https://api.github.com/graphql',
})

export default client
