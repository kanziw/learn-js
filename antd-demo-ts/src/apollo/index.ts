import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client/ApolloClient'
import { ApolloLink, concat } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { toast } from 'react-toastify'
import initializeLocalStateLink from './localState'
import { authMiddleware } from './middlewares'

const cache = new InMemoryCache()

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      toast.error(`Unexpected error: ${message}`)
    })
  }
  if (networkError) {
    toast.error(`Network error: ${networkError}`)
  }
})

const localStateLink = initializeLocalStateLink(cache)

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
})

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authMiddleware, httpLink),
  ]),
})

export default client
