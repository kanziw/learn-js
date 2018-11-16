import { Button, Form, Icon, Input } from 'antd'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const StyleInputAlpha = { color: 'rgba(0,0,0,.25)' }

const LoginPresenter: React.FunctionComponent = () => {
  const [ token, setToken ] = useState('')
  const onTokenInputChange = (e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item> Log in required! </Form.Item>
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
