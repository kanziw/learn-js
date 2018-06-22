const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.post('/user', (req, res) => {
  res.json({ ok: 1 })
})

app.use((err, req, res, next) => {
  res.status(400).json({ err: { message: err.message } })
})

module.exports = app
