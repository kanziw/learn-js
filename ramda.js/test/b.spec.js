const R = require('ramda')
const expect = require('chai').expect

describe('binary', () => {
  it('simple', () => {
    const takesThreeArgs = (a, b, c) => ([ a, b, c ])
    expect(takesThreeArgs).lengthOf(3)
    expect(takesThreeArgs(1, 2, 3)).eql([ 1, 2, 3 ])

    const takesTwoArgs = R.binary(takesThreeArgs)
    expect(takesTwoArgs).lengthOf(2)
    expect(takesTwoArgs(1, 2, 3)).eql([ 1, 2, undefined ])
  })
})

describe('bind', () => {
  const newThis = { a: 'THIS' }
  const returnThis = function () { return this }

  it('simple', () => {
    const getThis = R.bind(returnThis, newThis)
    expect(getThis()).eql(newThis)
  })

  it('curry', () => {
    const curry = R.bind(returnThis)
    expect(curry).to.be.an('function')

    const getThis = curry(newThis)
    expect(getThis).to.be.an('function')
    expect(getThis()).eql(newThis)
  })
})
