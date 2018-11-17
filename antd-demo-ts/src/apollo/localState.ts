import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { IContext, LogUserInVariables } from '../types'
import { generateAuthData, removeUserCredential, setUserCredential } from '../utils/credential'

const initializeLocalStateLink = (cache: InMemoryCache) => withClientState({
  cache,
  defaults: {
    ...generateAuthData(),
  },
  resolvers: {
    Mutation: {
      logUserIn: (_: any, logUserInVariable: LogUserInVariables, { cache: appCache }: IContext) => {
        setUserCredential(logUserInVariable)
        appCache.writeData({ data: generateAuthData(true) })
        return null
      },
      logUserOut: (_: any, __: any, { cache: appCache }: IContext) => {
        removeUserCredential()
        appCache.writeData({ data: generateAuthData(false) })
        return null
      },
    },
  },
})

export default initializeLocalStateLink
