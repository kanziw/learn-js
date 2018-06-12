const R = require('ramda')
const expect = require('chai').expect

describe('either', () => {
  /**
   * || operation.
   * 좌측의 함수부터 평가하며 True 이면 truthy 한 첫번째 함수 결과, False 이면 falsy 마지막 함수의 결과를 반환한다.
   */

  const gt10 = x => x > 10
  const even = x => x % 2 === 0

  it('simple, can not use immediately.', () => {
    expect(R.either(gt10, even, 100)).to.be.an('function')

    const gt10OrEven = R.either(gt10, even)
    expect(gt10OrEven(101)).eql(true)
    expect(gt10OrEven(8)).eql(true)
    expect(gt10OrEven(5)).eql(false)
  })

  it('curry', () => {
    const gt10OrEven = R.either(gt10)(even)
    expect(gt10OrEven(101)).eql(true)
    expect(gt10OrEven(8)).eql(true)
    expect(gt10OrEven(5)).eql(false)
  })

  it('return truthy or falsy value', () => {
    const includeK = str => R.indexOf('k', str.toLowerCase()) + 1
    const includeW = str => R.indexOf('w', str.toLowerCase()) + 1

    const compFn = R.either(includeK, includeW)
    expect(compFn('kanziw')).eql(1)
    expect(compFn('anzik')).eql(5)
    expect(compFn('david')).eql(0)
  })
})

describe('empty', () => {
  it('simple', () => {
    // expect(R.empty(Maybe.Just(42))).eql(Maybe.Nothing())
    expect(R.empty([ 1, 2, 3 ])).eql([])
    expect(R.empty('unicorns')).eql('')
    expect(R.empty({ x: 1, y: 2 })).eql({})
  })
})

describe('endsWith', () => {
  /**
   * (stringProp, string) => boolean
   * (arrayProp, array) => boolean
   * 마지막에 해당하는 요소가 있는가?
   */
  it('simple', () => {
    expect(R.endsWith('c', 'abc')).eql(true)
    expect(R.endsWith('b', 'abc')).eql(false)

    expect(R.endsWith([ 'c' ], [ 'a', 'b', 'c' ])).eql(true)
    expect(R.endsWith([ 'b', 'c' ], [ 'a', 'b', 'c' ])).eql(true)

    expect(R.endsWith([ 'b' ], [ 'a', 'b', 'c' ])).eql(false)
    expect(R.endsWith('c', [ 'a', 'b', 'c' ])).eql(false)
  })

  it('curry', () => {
    expect(R.endsWith('c')('abc')).eql(true)
    expect(R.endsWith('b')('abc')).eql(false)

    expect(R.endsWith([ 'c' ])([ 'a', 'b', 'c' ])).eql(true)
    expect(R.endsWith([ 'b', 'c' ])([ 'a', 'b', 'c' ])).eql(true)

    expect(R.endsWith([ 'b' ])([ 'a', 'b', 'c' ])).eql(false)
    expect(R.endsWith('c')([ 'a', 'b', 'c' ])).eql(false)
  })
})

describe('eqBy', () => {
  /**
   * Takes a function and two values in its domain and returns true if the values map to the same value in the codomain; false otherwise.
   *
   * (compFn, v1, v2) => boolean
   * compFn 을 통해 v1 과 v2 를 비교한다.
   */
  it('simple', () => {
    expect(R.eqBy(Math.abs, 5, -5)).to.be.true
    expect(R.eqBy(Math.abs, 5, -3)).to.be.false
  })

  it('curry', () => {
    expect(R.eqBy(Math.abs)(5)(-5)).to.be.true
    expect(R.eqBy(Math.abs)(5)(-3)).to.be.false
  })
})

describe('eqProps', () => {
  /**
   * Reports whether two objects have the same value, in R.equals terms, for the specified property.
   * Useful as a curried predicate.
   *
   * (prop, obj1, obj2) => boolean
   * obj1 과 obj2 의 prop 값을 비교한다.
   */

  const obj1 = { a: 1, b: 2, c: 3, d: 4 }
  const obj2 = { a: 10, b: 20, c: 3, d: 40 }

  it('simple', () => {
    expect(R.eqProps('a', obj1, obj2)).to.be.false
    expect(R.eqProps('c', obj1, obj2)).to.be.true
  })

  it('curry', () => {
    expect(R.eqProps('a')(obj1)(obj2)).to.be.false
    expect(R.eqProps('c')(obj1)(obj2)).to.be.true
  })
})

describe('equals', () => {
  /**
   * Returns true if its arguments are equivalent, false otherwise. Handles cyclical data structures.
   * Dispatches symmetrically to the equals methods of both arguments, if present.
   *
   * (v1, v2) => boolean
   * (순환참조로 이루어진 것을 포함하여) v1, v2 의 값이 같은지 비교한다.
   */
  it('simple', () => {
    expect(R.equals(1, 1)).to.be.true
    expect(R.equals(1, '1')).to.be.false
    expect(R.equals([ 1, 2, 3 ], [ 1, 2, 3 ])).to.be.true

    const a = {}
    a.v = a
    const b = {}
    b.v = b
    expect(R.equals(a, b)).to.be.true
  })

  it('curry', () => {
    expect(R.equals(1)(1)).to.be.true
    expect(R.equals(1)('1')).to.be.false
    expect(R.equals([ 1, 2, 3 ])([ 1, 2, 3 ])).to.be.true
  })
})
