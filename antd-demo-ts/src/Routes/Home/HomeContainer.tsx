import React from 'react'
import { Mutation, MutationFn, QueryResult } from 'react-apollo'
import { User, UserVariables } from '../../types/api'
import HomePresenter from './HomePresenter'

interface LogInQuery extends QueryResult<User, UserVariables> {}

interface LogOutMutation extends Mutation<{}, {}> {
  logOutUser: MutationFn
}

interface HomeContainer extends React.FunctionComponent<LogInQuery & LogOutMutation> {}

const HomeContainer: HomeContainer = ({ error, loading, data, logOutUser }) => {
  if (error) {
    console.log('>>> ERROR', error)
    return <h1>ERROR!</h1>
  }
  if (loading) { return <h1>Loading...</h1> }

  const user = data!.user!
  const logOut = () => logOutUser()
  return <HomePresenter user={user} logOut={logOut} />
}

export default HomeContainer
