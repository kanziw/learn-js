const R = require('ramda')
const expect = require('chai').expect

describe('call', () => {
  it('simple', () => {
    expect(R.call(R.add, 1, 2)).eql(3)

    const add1 = R.call(R.add, 1)
    expect(add1).to.be.an('function')
    expect(add1(2)).eql(3)
  })

  it('curry', () => {
    const adder = R.call(R.add)

    expect(adder).to.be.an('function')
    expect(adder(1, 2)).eql(3)

    const add1 = adder(1)
    expect(add1).to.be.an('function')
    expect(add1(2)).eql(3)
  })
})
