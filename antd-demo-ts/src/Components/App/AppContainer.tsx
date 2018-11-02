import * as React from 'react'
import GlobalStyle from '../../global-styles'
import theme from '../../theme'
import { ThemeProvider } from '../../typed-components'

export default () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <div>Hello React!</div>
    </>
  </ThemeProvider>
)
