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

describe('inc', () => {
  it('simple', () => {
    expect(R.inc(1)).eql(2)
  })
})

describe('indexBy', () => {
  const testArr = [ { id: 'xyz', title: 'A' }, { id: 'abc', title: 'B' } ]
  const resultObj = { abc: { id: 'abc', title: 'B' }, xyz: { id: 'xyz', title: 'A' } }

  it('simple & curry', () => {
    expect(R.indexBy(R.prop('id'), testArr)).eql(resultObj)
    expect(R.indexBy(R.prop('id'))(testArr)).eql(resultObj)
  })
})

describe('indexOf', () => {
  it('simple & curry', () => {
    expect(R.indexOf(3, [ 1, 2, 3, 4 ])).eql(2)
    expect(R.indexOf(10, [ 1, 2, 3, 4 ])).eql(-1)

    expect(R.indexOf(3)([ 1, 2, 3, 4 ])).eql(2)
    expect(R.indexOf(10)([ 1, 2, 3, 4 ])).eql(-1)
  })
})

describe('init', () => {
  /**
   * 가장 마지막 요소를 제외한 결과를 반환한다.
   */
  it('simple', () => {
    expect(R.init([ 1, 2, 3 ])).eql([ 1, 2 ])
    expect(R.init([ 1, 2 ])).eql([ 1 ])
    expect(R.init([ 1 ])).eql([])
    expect(R.init([])).eql([])

    expect(R.init('abc')).eql('ab')
    expect(R.init('ab')).eql('a')
    expect(R.init('a')).eql('')
    expect(R.init('')).eql('')
  })
})
