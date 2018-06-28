const app = require('../index')

app.use('/api', (req, res, next) => {
  req.app.locals.cnt++
  next()
})

app.get('/api', (req, res) => res.json({ path: '/api' }))

module.exports = app
