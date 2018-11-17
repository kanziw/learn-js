import * as React from 'react'
import { QueryResult } from 'react-apollo'
import { ToastContainer, ToastPosition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalStyle from '../../global-styles'
import theme from '../../theme'
import { ThemeProvider } from '../../typed-components'
import { Auth, LogUserInVariables } from '../../types'
import AppPresenter from './AppPresenter'

interface AuthQuery extends QueryResult<Auth, LogUserInVariables> {}

interface AppContainer extends React.FunctionComponent<AuthQuery> {}

const AppContainer: AppContainer = ({ data }) => (
  <>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <AppPresenter isLoggedIn={data!.auth.isLoggedIn} />
      </>
    </ThemeProvider>
    <ToastContainer
      draggable={true}
      position={ToastPosition.TOP_CENTER}
    />
  </>
)

export default AppContainer
