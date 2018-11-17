import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { LOG_USER_OUT } from '../../sharedQueries.local'

const LOG_USER_IN_GITHUB = gql`
  query Viewer {
    viewer {
      id
      name
    }
  }
`

export const QueryLogUserInGithub = graphql(
  LOG_USER_IN_GITHUB,
)

export const MutationLogUserOut = graphql(
  LOG_USER_OUT,
  { name: 'logOutUser' },
)
