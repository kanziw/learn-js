import { InMemoryCache } from 'apollo-cache-inmemory'

export * from './graphql'
export * from './graphql.local'
export * from './fragments'
export * from './api'

export interface IContext {
  cache: InMemoryCache
  headers: { [ key: string ]: any }
  loading: boolean
}
