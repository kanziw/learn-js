import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import client from './apollo'
import App from './Components/App/AppContainer'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
