import { Button, Form, Icon, Input } from 'antd'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { MutationFn } from 'react-apollo'

const StyleInputAlpha = { color: 'rgba(0,0,0,.25)' }

interface IProps {
  logUserIn: MutationFn
}

const onInputChanger = (setter: (value: string) => void): ((e: ChangeEvent<HTMLInputElement>) => void) =>
  (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value)

const LoginPresenter: React.FunctionComponent<IProps> = ({ logUserIn }) => {
  const [ userName, setUserName ] = useState('')
  const [ token, setToken ] = useState('')

  const onUserNameInputChange = onInputChanger(setUserName)
  const onTokenInputChange = onInputChanger(setToken)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    return logUserIn({ variables: { userName, token } })
  }

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={StyleInputAlpha} />}
          placeholder="User name"
          value={userName}
          onChange={onUserNameInputChange}
          onPressEnter={handleSubmit}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={StyleInputAlpha} />}
          type="password"
          placeholder="Github Token"
          value={token}
          onChange={onTokenInputChange}
          onPressEnter={handleSubmit}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginPresenter
