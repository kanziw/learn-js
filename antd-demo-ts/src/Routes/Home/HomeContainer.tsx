import React from 'react'
import { graphql, QueryResult } from 'react-apollo'
import { User, UserVariables } from '../../types/api'
import HomePresenter from './HomePresenter'
import { LOG_USER_IN_GITHUB } from './HomeQueries'

interface IContainer
  extends React.FunctionComponent<QueryResult<User, UserVariables>> {}

const HomeContainer: IContainer = ({ error, loading, data }) => {
  if (error) {
    console.log('>>> ERROR', error)
    return <h1>ERROR!</h1>
  }
  if (loading) { return <h1>Loading...</h1> }

  const user = data!.user!
  return <HomePresenter user={user} />
}

export default graphql(
  LOG_USER_IN_GITHUB,
  {
    options: { variables: { login: 'kanziw' } },
  },
)(HomeContainer as React.FunctionComponent)
