const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

chai.use(chaiHttp)
const expect = chai.expect

it('/', async () => {
  const { body: { path }, error } = await chai.request(app).get('/')
  expect(path).eql('/')
  expect(error).to.be.false
})

it('/api', async () => {
  const { body: { path }, error } = await chai.request(app).get('/api')
  expect(path).eql('/api')
  expect(error).to.be.false
})

it('/api/sub', async () => {
  const { body: { path }, error } = await chai.request(app).get('/api/sub')
  expect(path).eql('/api/sub')
  expect(error).to.be.false
})

it('/api/sub 와 /api/sub2 가 각각 /api 를 2번 import 했어도 /api 로직이 2번 수행되진 않는다.', async () => {
  const beforeCnt = app.locals.cnt

  const { body: { path }, error } = await chai.request(app).get('/api/sub2')
  expect(path).eql('/api/sub2')
  expect(error).to.be.false

  expect(app.locals.cnt).eql(beforeCnt + 1)
})
