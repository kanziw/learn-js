import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost'

const TOKEN_KEY = 'githubToken'
const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return ''
  }
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  clientState: {
    defaults: {
      auth: {
        __typename: 'Auth',
        isLoggedIn: Boolean(getToken()),
      },
    },
    resolvers: {
      Mutation: {
        logUserIn: (_: any, { token }: { token: string }, { cache }: IContext) => {
          localStorage.setItem(TOKEN_KEY, token)
          cache.writeData({
            data: {
              auth: {
                __typename: 'Auth',
                isLoggedIn: true,
              },
            },
          })
          return null
        },
        logUserOut: (_: any, __: any, { cache }: IContext) => {
          localStorage.removeItem(TOKEN_KEY)
          cache.writeData({
            data: {
              auth: {
                __typename: 'Auth',
                isLoggedIn: false,
              },
            },
          })
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

interface IContext {
  cache: InMemoryCache
}
