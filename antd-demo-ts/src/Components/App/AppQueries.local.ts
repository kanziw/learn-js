import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`

export const QueryIsLoggedIn = graphql(IS_LOGGED_IN)
