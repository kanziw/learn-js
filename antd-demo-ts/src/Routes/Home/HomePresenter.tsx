import { Button } from 'antd'
import React from 'react'
import { Viewer_viewer } from '../../types'

interface Props {
  me: Viewer_viewer
  logOut: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface HomePresenter extends React.FunctionComponent<Props> {}

const HomePresenter: HomePresenter = ({ me, logOut }) => (
  <>
    <h1>YOU ARE LOGGED IN!</h1>
    <div>{JSON.stringify(me, null, 2)}</div>
    <Button type="primary" onClick={logOut} block={true}>
      LOGOUT
    </Button>
  </>
)

export default HomePresenter
