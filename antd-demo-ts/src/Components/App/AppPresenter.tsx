import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../Routes/Home'
import Login from '../../Routes/Login'

interface IProps {
  isLoggedIn: boolean
}

const AppPresenter: React.FunctionComponent<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
)

const LoggedOutRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path={'/'} exact={true} component={Login} />
    <Redirect from={'*'} to={'/'} />
  </Switch>
)

const LoggedInRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path={'/'} exact={true} component={Home} />
    <Redirect from={'*'} to={'/'} />
  </Switch>
)


export default AppPresenter
