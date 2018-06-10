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

describe('both', () => {
  /**
   * See also R.and
   */

  it('simple', () => {
    const getTrue = R.always(true)
    const getFalse = R.always(false)

    const TnT = R.both(getTrue, getTrue)
    const TnF = R.both(getTrue, getFalse)
    const FnT = R.both(getFalse, getTrue)
    const FnF = R.both(getFalse, getFalse)

    expect(TnT()).eql(true)
    expect(TnF()).eql(false)
    expect(FnT()).eql(false)
    expect(FnF()).eql(false)
  })

  it('get latest value if true. if false, get first falsy value.', () => {
    const getA = R.always('A')
    const getZ = R.always(0)

    const AnA = R.both(getA, getA)
    const ZnA = R.both(getZ, getA)
    const AnZ = R.both(getA, getZ)
    const ZnZ = R.both(getZ, getZ)

    expect(AnA()).eql(getA())
    expect(ZnA()).eql(getZ())
    expect(AnZ()).eql(getZ())
    expect(ZnZ()).eql(getZ())

    expect(getA() && getA()).eql(getA())
    expect(getA() && getZ()).eql(getZ())
    expect(getZ() && getA()).eql(getZ())
    expect(getZ() && getZ()).eql(getZ())
  })
})
