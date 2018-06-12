const R = require('ramda')
const expect = require('chai').expect

describe('dec', () => {
  it('simple', () => {
    expect(R.dec(30)).eql(29)
    expect(R.dec(29)).eql(28)
    expect(R.dec(28)).eql(27)
  })
})
