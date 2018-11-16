import gql from 'graphql-tag'

export const UserFragment = {
  Simple: gql`
    fragment UserSimple on User {
      avatarUrl
      company
      email
      id
      location
      login
      name
      url
    }
  `,
}
