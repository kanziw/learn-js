module.exports = (req, res) => {
  /*
  http://localhost:3000/param/ => "Here is /param /w params []"
  http://localhost:3000/param/abc => "Here is /param /w params [\"abc\"]"
  http://localhost:3000/param/abc/def => "Here is /param /w params [\"abc\",\"def\"]"
   */
  res.json(`Here is /param /w params ${JSON.stringify(req.params)}`)
}
