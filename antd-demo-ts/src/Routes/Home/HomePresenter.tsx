import { Button } from 'antd'
import React from 'react'
import { User_user } from '../../types/api'

interface Props {
  user: User_user
  logOut: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface HomePresenter extends React.FunctionComponent<Props> {}

const HomePresenter: HomePresenter = ({ user, logOut }) => (
  <>
    <h1>YOU ARE LOGGED IN!</h1>
    <div>{JSON.stringify(user, null, 2)}</div>
    <Button type="primary" onClick={logOut} block={true}>
      LOGOUT
    </Button>
  </>
)

export default HomePresenter
