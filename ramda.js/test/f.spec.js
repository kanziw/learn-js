const R = require('ramda')
const expect = require('chai').expect

describe('F', () => {
  it('simple', () => {
    expect(R.F()).to.be.false
  })
})

describe('filter', () => {
  /**
   * Object 가 평가 할 대상으로 들어오면 value 를 통과한 Object 를 반환한다.
   */

  const testArr = [ 1, 2, 3, 4 ]
  const testObj = { a: 1, b: 2, c: 3, d: 4 }
  const evenArr = [ 2, 4 ]
  const evenObj = { b: 2, d: 4 }
  const isEven = n => n % 2 === 0

  it('simple & curry', () => {
    expect(R.filter(isEven, testArr)).eql(evenArr)
    expect(R.filter(isEven, testObj)).eql(evenObj)

    const filterEven = R.filter(isEven)
    expect(filterEven(testArr)).eql(evenArr)
    expect(filterEven(testObj)).eql(evenObj)
  })
})

describe('find', () => {
  /**
   * predicate 를 true 로 반환하는 첫번째 인자 혹은 undefined(없는 경우) 를 반환한다.
   * Object 는 지원하지 않는다.
   */

  it('simple & curry', () => {
    const xs = [ { a: 1 }, { a: 2 }, { a: 3 } ]
    expect(R.find(R.propEq('a', 2), xs)).eql({ a: 2 })
    expect(R.find(R.propEq('a', 4), xs)).to.be.undefined

    expect(R.find(R.propEq('a', 2))(xs)).eql({ a: 2 })
    expect(R.find(R.propEq('a', 4))(xs)).to.be.undefined
  })
})

describe('findLast', () => {
  it('simple & curry', () => {
    const xs = [ { a: 1, b: 0 }, { a: 1, b: 1 } ]
    expect(R.findLast(R.propEq('a', 1), xs)).eql({ a: 1, b: 1 })
    expect(R.findLast(R.propEq('a', 4), xs)).to.be.undefined

    expect(R.findLast(R.propEq('a', 1))(xs)).eql({ a: 1, b: 1 })
    expect(R.findLast(R.propEq('a', 4))(xs)).to.be.undefined
  })
})

describe('findIndex', () => {
  it('simple & curry', () => {
    const xs = [ { a: 1 }, { a: 2 }, { a: 3 } ]
    expect(R.findIndex(R.propEq('a', 2), xs)).eql(1)
    expect(R.findIndex(R.propEq('a', 4), xs)).eql(-1)

    expect(R.findIndex(R.propEq('a', 2))(xs)).eql(1)
    expect(R.findIndex(R.propEq('a', 4))(xs)).eql(-1)
  })
})

describe('findLastIndex', () => {
  it('simple & curry', () => {
    const xs = [ { a: 1, b: 0 }, { a: 1, b: 1 } ]
    expect(R.findLastIndex(R.propEq('a', 1), xs)).eql(1)
    expect(R.findLastIndex(R.propEq('a', 4), xs)).eql(-1)

    expect(R.findLastIndex(R.propEq('a', 1))(xs)).eql(1)
    expect(R.findLastIndex(R.propEq('a', 4))(xs)).eql(-1)
  })
})

describe('flatten', () => {
  it('simple', () => {
    expect(R.flatten([ 1, 2, [ 3, 4 ], 5, [ 6, [ 7, 8, [ 9, [ 10, 11 ], 12 ] ] ] ]))
      .eql([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ])
  })
})

describe('flip', () => {
  /**
   * 첫번째 / 두번째 인자를 바꿔 함수를 실행하게 하는 함수를 반환한다.
   */

  const getArgs = (...args) => args

  it('simple', () => {
    expect(R.flip(getArgs)).to.be.an('function')

    expect(getArgs(1, 2, 3, 4, 5)).eql([ 1, 2, 3, 4, 5 ])
    expect(R.flip(getArgs)(1, 2, 3, 4, 5)).eql([ 2, 1, 3, 4, 5 ])
  })
})
