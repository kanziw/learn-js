import { compose, graphql } from 'react-apollo'
import AppContainer from './AppContainer'
import { IS_LOGGED_IN } from './AppQueries.local'

export default compose(graphql(IS_LOGGED_IN))(AppContainer)
