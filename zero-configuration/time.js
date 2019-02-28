const moment = require('moment')

module.exports = (req, res) => {
  const time = moment().format('LT')
  res.send({ time: time })
}
