const R = require('ramda')
const expect = require('chai').expect

describe('F', () => {
  it('simple', () => {
    expect(R.F()).to.be.false
  })
})
