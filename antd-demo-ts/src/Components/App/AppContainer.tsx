import * as React from 'react'
import { graphql } from 'react-apollo'
import GlobalStyle from '../../global-styles'
import theme from '../../theme'
import { ThemeProvider } from '../../typed-components'
import AppPresenter from './AppPresenter'
import { IS_LOGGED_IN } from './AppQueries.local'

// @ts-ignore
const AppContainer: React.FunctionComponent = ({ data }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </>
  </ThemeProvider>
)

export default graphql(IS_LOGGED_IN)(AppContainer)
