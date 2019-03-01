const { AUTHOR } = require('./const')

module.exports = (req, res) => {
  res.json({
    AUTHOR,
    text: 'Place your Node.js API here.'
  })
}
