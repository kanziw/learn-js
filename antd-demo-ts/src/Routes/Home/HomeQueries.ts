import { gql } from 'apollo-boost'
import { UserFragment } from '../../types/fragments'

export const LOG_USER_IN_GITHUB = gql`
  query User($login: String!) {
    user(login: $login) {
      ...UserSimple
    }
  }
  ${UserFragment.Simple}
`
