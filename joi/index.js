const express = require('express')
const bodyParser = require('body-parser')
const Joi = require('joi')
const R = require('ramda')

const app = express()
app.use(bodyParser.json())

const s = (schema, { parseOrder = [ 'query', 'body', 'params' ], property = 'input' } = {}) => {
  const keys = R.keys(schema)
  return (req, res, next) => R.pipe(
    R.pick(parseOrder),
    R.values,
    R.map(obj => R.pick(keys, obj)),
    R.mergeAll,
    input => Joi.validate(input, schema, (err, value) => {
      console.log('__ERR', err)
      console.log('__VAL', value)
      return value
    }),
    input => req[ property ] = input,
    () => next()
  )(req)
}

app.set('DB', new Map())

// sanitizer
const schema = {
  // string / 문자열로 시작 / 문자열+숫자만 가능 / trim 후 길이는 5
  username: Joi.string().required().trim().regex(/^[a-zA-Z][a-zA-Z0-9]{5}$/).alphanum(),
}
app.get('/user/:username', s(schema), (req, res) => {
  const { username } = req.input
  const me = req.app.get('DB').get(username) || {}
  res.json({ ok: 1, me })
})

const schemaSignup = {
  username: Joi.string().required().trim().regex(/^[a-zA-Z]/).alphanum().min(2).max(20),
  email: Joi.string().required().email(),
  pw: Joi.string().required().min(6).max(20),
}
app.post('/user', s(schemaSignup), (req, res) => {
  const { username, email, pw } = req.input

  /** @type {Map} */
  const DB = req.app.get('DB')
  if (!DB.has(username)) {
    DB.set(username, { email, pw })
  } else {
    throw new Error('Given email already taken!')
  }

  res.json({ ok: 1 })
})

app.use((err, req, res, next) => {
  console.log('', err)
  res.status(400).json({ err: { message: err.message } })
})

module.exports = app
