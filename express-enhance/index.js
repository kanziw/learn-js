const express = require('express')

const app = express()

app.get('/', (req, res) => res.json({ path: '/' }))

module.exports = app

// api 디렉터리 밑에 있는 index.js 를 모두 찾아 require 한다.
const { join } = require('path')
require('glob').sync(`${join(__dirname, './api')}/**/index.js`).forEach(file => require(file))
