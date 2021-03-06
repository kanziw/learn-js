const express = require('express')
const Promise = require('bluebird')
const morgan = require('morgan')

const app = express()

app.set('trust proxy', true)
app.use(morgan('short'))
app.use('/asset', express.static(__dirname + '/asset'))
app.use((req, res, next) => {
  console.log(` LOG FROM: ${req.ip} / TO: ${req.path}`)
  console.debug(` DEBUG FROM: ${req.ip} / TO: ${req.path}`)
  console.info(` INFO FROM: ${req.ip} / TO: ${req.path}`)
  console.warn(` WARN FROM: ${req.ip} / TO: ${req.path}`)
  console.error(new Error('SAMPLE ERROR'))
  next()
})

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end()
})

app.get('/async', async (req, res) => {
  await Promise.delay(3000)
  res.status(200).send('Hello, world! (After 3 seconds)').end()
})

app.get('/ip', (req, res) => {
  res.status(200).send(`Is your IP [${req.ip}] ??`)
})

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
