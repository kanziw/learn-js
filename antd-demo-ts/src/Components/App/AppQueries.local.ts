import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`

export const QueryIsLoggedIn = graphql(IS_LOGGED_IN)
