const app = require('../index')

app.get('/api', (req, res) => res.json({ path: '/api' }))

module.exports = app
