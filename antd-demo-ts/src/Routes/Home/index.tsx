import { compose } from 'react-apollo'
import HomeContainer from './HomeContainer'
import { MutationLogUserOut, QueryLogUserInGithub } from './HomeQueries'

export default compose(
  QueryLogUserInGithub,
  MutationLogUserOut,
)(HomeContainer)
