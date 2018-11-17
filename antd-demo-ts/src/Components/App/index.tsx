import { compose } from 'react-apollo'
import AppContainer from './AppContainer'
import { QueryIsLoggedIn } from './AppQueries.local'

export default compose(
  QueryIsLoggedIn,
)(AppContainer)
