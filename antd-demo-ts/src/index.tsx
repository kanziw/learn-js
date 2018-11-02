import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './Components/App/AppContainer'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
