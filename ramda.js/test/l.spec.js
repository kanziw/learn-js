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

describe('length', () => {
  it('simple', () => {
    expect(R.length([])).eql(0)
    expect(R.length([ 1, 2, 3 ])).eql(3)

    expect(R.length('')).eql(0)
    expect(R.length('123')).eql(3)

    expect(R.length(function (a, b) { return a + b })).eql(2)

    expect(R.length(undefined)).to.be.NaN
    expect(R.length(null)).to.be.NaN
    expect(R.length({})).to.be.NaN
  })
})

describe('lens', () => {
  /**
   * object 혹은 array 로 부터 요소를 찾아서 자기 자신을 호출하는 인자에 전달하는... 것 같다.
   */
  it('simple', () => {
    const obj = { x: 1, y: 2 }
    const xLens = R.lens(R.prop('x'), R.assoc('x'))

    expect(R.view(xLens, obj)).eql(1)
    expect(R.set(xLens, 4, obj)).eql({ x: 4, y: 2 })
    expect(R.over(xLens, R.negate, obj)).eql({ x: -1, y: 2 })

    // handle variable immutably
    expect(obj).eql({ x: 1, y: 2 })
  })
})

describe('lensIndex', () => {
  /**
   * 요소의 인덱스(key)를 찾아 반환하는 lens 를 수행한다. (?)
   */
  it('simple', () => {
    const headLens = R.lensIndex(0)

    expect(R.view(headLens, [ 'a', 'b', 'c' ])).eql('a')
    expect(R.set(headLens, 'x', [ 'a', 'b', 'c' ])).eql([ 'x', 'b', 'c' ])
    expect(R.over(headLens, R.toUpper, [ 'a', 'b', 'c' ])).eql([ 'A', 'b', 'c' ])
    expect(R.view(headLens, { 0: 'a' })).eql('a')
  })
})

describe('lensPath', () => {
  /**
   * 요소의 path 를 찾아 반환하는 lens 를 수행한다. (?)
   */
  it('simple', () => {
    const xHeadYLens = R.lensPath([ 'x', 0, 'y' ])

    expect(R.view(xHeadYLens, { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }))
      .eql(2)
    expect(R.set(xHeadYLens, 1, { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }))
      .eql({ x: [ { y: 1, z: 3 }, { y: 4, z: 5 } ] })
    expect(R.over(xHeadYLens, R.negate, { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }))
      .eql({ x: [ { y: -2, z: 3 }, { y: 4, z: 5 } ] })
  })
})

describe('lensProp', () => {
  /**
   * 요소의 prop 을 찾아 반환하는 lens 를 수행한다. (?)
   */
  it('simple', () => {
   const xLens = R.lensProp('x')

    expect(R.view(xLens, { x: 1, y: 2 })).eql(1)
    expect(R.set(xLens, 4, { x: 1, y: 2 })).eql({ x: 4, y: 2 })
    expect(R.over(xLens, R.negate, { x: 1, y: 2 })).eql({ x: -1, y: 2 })

    expect(R.view(R.lensProp(0), [ 'a', 'b', 'c' ])).eql('a')
  })
})
