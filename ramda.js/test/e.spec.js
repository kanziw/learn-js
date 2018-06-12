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
