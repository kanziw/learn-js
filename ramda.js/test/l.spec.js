const R = require('ramda')
const expect = require('chai').expect

describe('last', () => {
  it('simple', () => {
    expect(R.last([ 'A', 'B', 'C' ])).eql('C')
    expect(R.last([])).to.be.undefined
    expect(R.last([ null ])).to.be.null

    expect(R.last('ABC')).eql('C')
    expect(R.last('')).eql('')
  })
})

describe('lastIndexOf', () => {
  it('simple & curry', () => {
    expect(R.lastIndexOf(3, [ 0, 1, 2, 3, 4, 5, 6 ])).eql(3)
    expect(R.lastIndexOf(-3, [ 0, 1, 2, 3, 4, 5, 6 ])).eql(-1)
    expect(R.lastIndexOf(9, [ 0, 1, 2, 3, 4, 5, 6 ])).eql(-1)

    expect(R.lastIndexOf(3)([ 0, 1, 2, 3, 4, 5, 6 ])).eql(3)
    expect(R.lastIndexOf(-3)([ 0, 1, 2, 3, 4, 5, 6 ])).eql(-1)
    expect(R.lastIndexOf(9)([ 0, 1, 2, 3, 4, 5, 6 ])).eql(-1)
  })
})
