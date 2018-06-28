const app = require('../index')

app.get('/api/sub2', (req, res) => res.json({ path: '/api/sub2' }))
