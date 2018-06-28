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
