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
