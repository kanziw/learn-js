module.exports = (req, res) => {
  /*
  http://localhost:3000/param/user => "Here is /param/user /w params []"
  http://localhost:3000/param/user/123 => "Here is /param/user /w params [\"123\"]"
  http://localhost:3000/param/user/123/posts => "Here is /param/user /w params [\"123\",\"posts\"]"
   */
  res.json(`Here is /param/user /w params ${JSON.stringify(req.params)}`)
}
