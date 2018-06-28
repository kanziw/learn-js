const app = require('../index')

app.get('/api/sub', (req, res) => res.json({ path: '/api/sub' }))
