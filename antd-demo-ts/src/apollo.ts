import ApolloClient, { InMemoryCache } from 'apollo-boost'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  clientState: {
    defaults: {
      auth: {
        __typename: 'Auth',
        isLoggedIn: false,
      },
    },
    resolvers: {
      Mutation: {
        logUserIn: (_: any, __: any, { cache }: ICache) => {
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
        logUserOut: (_: any, __: any, { cache }: ICache) => {
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
  uri: 'http://localhost:4000/graphql',
})

export default client

interface ICache {
  cache: InMemoryCache
}
