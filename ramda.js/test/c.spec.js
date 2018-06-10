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

describe('chain', function () {
  /**
   * chain maps a function over a list and concatenates the results. chain is also known as flatMap in some libraries
   * Dispatches to the chain method of the second argument, if present, according to the FantasyLand Chain spec.
   *
   * 다른 라이브러리에서 일명 flatMap 이라 불리는 기능을 수행한다.
   */
  it('simple', () => {
    const duplicate = n => [ n, n ]
    expect(R.chain(duplicate, [ 1, 2, 3 ])).eql([ 1, 1, 2, 2, 3, 3 ])
    expect(R.chain(R.append, R.head)([ 1, 2, 3 ])).eql([ 1, 2, 3, 1 ])
    expect(R.chain(R.append, R.last)([ 1, 2, 3 ])).eql([ 1, 2, 3, 3 ])
  })
})
