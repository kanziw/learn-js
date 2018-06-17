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
