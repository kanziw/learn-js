import React from 'react'
import { User_user } from '../../types/api'

interface IProps {
  user: User_user
}

const HomePresenter: React.FunctionComponent<IProps> = ({ user }) => (
  <>
    <h1>YOU ARE LOGGED IN!</h1>
    <div>{JSON.stringify(user, null, 2)}</div>
  </>
)

export default HomePresenter
