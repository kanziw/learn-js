import React from 'react'
import { Mutation } from 'react-apollo'
import { LOG_USER_IN } from '../../sharedQueries.local'
import LoginPresenter from './LoginPresenter'

const LoginContainer: React.FunctionComponent = () => (
  <Mutation mutation={LOG_USER_IN}>
    {logUserIn => (
      <LoginPresenter logUserIn={logUserIn} />
    )}
  </Mutation>
)

export default LoginContainer
