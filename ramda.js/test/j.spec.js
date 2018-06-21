const R = require('ramda')
const expect = require('chai').expect

describe('join', () => {
  it('simple & curry', () => {
    expect(R.join(' ', [ 3, 'a', 'b', 1, 1.2 ])).eql('3 a b 1 1.2')
    expect(R.join('/', [ 3, 'a', 'b', 1, 1.2 ])).eql('3/a/b/1/1.2')

    expect(R.join(' ')([ 3, 'a', 'b', 1, 1.2 ])).eql('3 a b 1 1.2')
    expect(R.join('/')([ 3, 'a', 'b', 1, 1.2 ])).eql('3/a/b/1/1.2')
  })
})

describe('juxt', () => {
  it('simple', () => {
    const sumArgs = (...args) => R.sum(args)
    const minusArgs = (...args) => R.reduce(R.subtract, 0, args)

    expect(R.juxt([ Math.min, Math.max, sumArgs, minusArgs ])(3, 4, 9, -3)).eql([ -3, 9, 13, -13 ])
  })
})
