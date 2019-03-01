const notFoundHandler = (req, res) => {
  res.status(404).end()
}

const Router = (
  {
    get = notFoundHandler,
    post = notFoundHandler,
    put = notFoundHandler,
    del = notFoundHandler,
  } = {},
) => {
  return (req, res) => {
    switch (req.method) {
      case 'GET':
        return get(req, res)
      case 'POST':
        return post(req, res)
      case 'PUT':
        return put(req, res)
      case 'DELETE':
        return del(req, res)
      default:
        return notFoundHandler(req, res)
    }
  }
}

module.exports = Router({
  // get: ... => 404 page
  post: (req, res) => {
    res.send('POST')
  },
  put: (req, res) => {
    res.send('PUT')
  },
  // del: ... => 404 page
})
