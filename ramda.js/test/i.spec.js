const R = require('ramda')
const expect = require('chai').expect

describe('identical', () => {
  /**
   * 값 뿐 아니라 진짜 자기 자신인지를 확인한다.
   * {}, [] 는 매번 새로운 메모리에 할당되기에 false 이고
   * 1, NaN 은 이미 정의된 값이기에(?) true 인듯.
   */
  it('simple & curry', () => {
    const o = {}

    expect(R.identical(o, o)).to.be.true
    expect(R.identical(o, {})).to.be.false
    expect(R.identical(1, 1)).to.be.true
    expect(R.identical(1, '1')).to.be.false
    expect(R.identical([], [])).to.be.false
    expect(R.identical(0, -0)).to.be.false
    expect(R.identical(NaN, NaN)).to.be.true

    expect(R.identical(o)(o)).to.be.true
    expect(R.identical(o)({})).to.be.false
    expect(R.identical(1)(1)).to.be.true
    expect(R.identical(1)('1')).to.be.false
    expect(R.identical([])([])).to.be.false
    expect(R.identical(0)(-0)).to.be.false
    expect(R.identical(NaN)(NaN)).to.be.true
  })
})

describe('identity', () => {
  /**
   * 자기 자신을 반환한다.
   */
  it('simple', () => {
    expect(R.identity(1)).eql(1)

    const obj = {}
    expect(R.identity(obj) === obj).to.be.true
  })
})

describe('ifElse', () => {
  /**
   * (pred, ifFunction, elseFunction) => //
   */
  const pred = R.has('count')
  const ifFunction = R.over(R.lensProp('count'), R.inc)
  const elseFunction = R.assoc('count', 1)

  it('simple', () => {
    // Can not use directly
    expect(R.ifElse(pred, ifFunction, elseFunction, {})).not.eql({ count: 1 })
    expect(R.ifElse(pred, ifFunction, elseFunction, {})).be.an('function')

    const incCount = R.ifElse(pred, ifFunction, elseFunction)
    expect(incCount({})).eql({ count: 1 })
    expect(incCount({ count: 1 })).eql({ count: 2 })
  })

  it('curry', () => {
    const curry1 = R.ifElse(pred)
    expect(curry1).to.be.an('function')

    const curry2 = curry1(ifFunction)
    expect(curry2).to.be.an('function')

    const incCount = curry2(elseFunction)
    expect(incCount({})).eql({ count: 1 })
    expect(incCount({ count: 1 })).eql({ count: 2 })
  })
})
