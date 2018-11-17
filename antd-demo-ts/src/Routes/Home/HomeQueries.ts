import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import { LOG_USER_OUT } from '../../sharedQueries.local'
import { UserFragment } from '../../types/fragments'

export const LOG_USER_IN_GITHUB = gql`
  query User($login: String!) {
    user(login: $login) {
      ...UserSimple
    }
  }
  ${UserFragment.Simple}
`

export const QueryLogUserInGithub = graphql(
  LOG_USER_IN_GITHUB,
  {
    options: { variables: { login: 'kanziw' } },
  },
)

export const MutationLogUserOut = graphql(
  LOG_USER_OUT,
  { name: 'logOutUser' },
)
