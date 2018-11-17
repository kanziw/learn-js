import * as React from 'react'
import { QueryResult } from 'react-apollo'
import GlobalStyle from '../../global-styles'
import theme from '../../theme'
import { ThemeProvider } from '../../typed-components'
import { Auth, LogUserInVariables } from '../../types'
import AppPresenter from './AppPresenter'

interface AuthQuery extends QueryResult<Auth, LogUserInVariables> {}

interface AppContainer extends React.FunctionComponent<AuthQuery> {}

const AppContainer: AppContainer = ({ data }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <AppPresenter isLoggedIn={data!.auth.isLoggedIn} />
    </>
  </ThemeProvider>
)

export default AppContainer
