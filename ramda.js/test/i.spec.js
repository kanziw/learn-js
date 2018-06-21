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

describe('innerJoin', () => {
  /**
   * (pred, xs, ys) => xs'
   *
   * pred 는 binary function 이어야만 하며, (x, y) => boolean 의 형식을 만족한다.
   * xs' 는 pred 를 true 로 만족시키는 요소들이 필터링 된 결과이다.
   */
  it('simple & curry', () => {
    expect(R.innerJoin(
      (record, id) => record.id === id,
      [ { id: 824, name: 'Richie Furay' },
        { id: 956, name: 'Dewey Martin' },
        { id: 313, name: 'Bruce Palmer' },
        { id: 456, name: 'Stephen Stills' },
        { id: 177, name: 'Neil Young' } ],
      [ 177, 456, 999 ]
    )).eql([ { id: 456, name: 'Stephen Stills' }, { id: 177, name: 'Neil Young' } ])

    expect(R.innerJoin(
      (record, id) => record.id === id)
      ([
        { id: 824, name: 'Richie Furay' },
        { id: 956, name: 'Dewey Martin' },
        { id: 313, name: 'Bruce Palmer' },
        { id: 456, name: 'Stephen Stills' },
        { id: 177, name: 'Neil Young' }
      ])
      ([ 177, 456, 999 ])
    ).eql([ { id: 456, name: 'Stephen Stills' }, { id: 177, name: 'Neil Young' } ])
  })
})

describe('insert', () => {
  /**
   * (idx, value, arr) => arr
   *
   * arr 의 배열에 끼워넣을 수 없는 경우 맨 뒤에 push 한다.
   */
  it('simple & curry', () => {
    expect(R.insert(-3, 'x', [ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x' ])
    expect(R.insert(-1, 'x', [ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x' ])
    expect(R.insert(0, 'x', [ 1, 2, 3, 4 ])).eql([ 'x', 1, 2, 3, 4 ])
    expect(R.insert(2, 'x', [ 1, 2, 3, 4 ])).eql([ 1, 2, 'x', 3, 4 ])
    expect(R.insert(5, 'x', [ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x' ])
    expect(R.insert(9, 'x', [ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x' ])

    expect(R.insert(-3)('x')([ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x' ])
    expect(R.insert(-1)('x')([ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x' ])
    expect(R.insert(0)('x')([ 1, 2, 3, 4 ])).eql([ 'x', 1, 2, 3, 4 ])
    expect(R.insert(2)('x')([ 1, 2, 3, 4 ])).eql([ 1, 2, 'x', 3, 4 ])
    expect(R.insert(5)('x')([ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x' ])
    expect(R.insert(9)('x')([ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x' ])
  })
})

describe('insertAll', () => {
  /**
   * (idx, arr, orgArr) => arr
   *
   * arr 의 배열에 끼워넣을 수 없는 경우 맨 뒤에 push 한다.
   */
  it('simple', () => {
    expect(R.insertAll(-2, [ 'x', 'y', 'z' ], [ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x', 'y', 'z' ])
    expect(R.insertAll(0, [ 'x', 'y', 'z' ], [ 1, 2, 3, 4 ])).eql([ 'x', 'y', 'z', 1, 2, 3, 4 ])
    expect(R.insertAll(2, [ 'x', 'y', 'z' ], [ 1, 2, 3, 4 ])).eql([ 1, 2, 'x', 'y', 'z', 3, 4 ])
    expect(R.insertAll(5, [ 'x', 'y', 'z' ], [ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x', 'y', 'z' ])

    expect(R.insertAll(-2)([ 'x', 'y', 'z' ])([ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x', 'y', 'z' ])
    expect(R.insertAll(0)([ 'x', 'y', 'z' ])([ 1, 2, 3, 4 ])).eql([ 'x', 'y', 'z', 1, 2, 3, 4 ])
    expect(R.insertAll(2)([ 'x', 'y', 'z' ])([ 1, 2, 3, 4 ])).eql([ 1, 2, 'x', 'y', 'z', 3, 4 ])
    expect(R.insertAll(5)([ 'x', 'y', 'z' ])([ 1, 2, 3, 4 ])).eql([ 1, 2, 3, 4, 'x', 'y', 'z' ])
  })
})

describe('intersection', () => {
  /**
   * 교집합을 구한다.
   *
   * arr & string 의 교집합도 구할 수 있다.
   */
  it('simple & curry', () => {
    expect(R.intersection([ 1, 2, 3, 4 ], [ 7, 6, 5, 4, 3 ])).eql([ 3, 4 ])
    expect(R.intersection([ 'a', 'b', 3, 4 ], [ 7, 'c', 'a', 4, 3 ])).eql([ 'a', 3, 4 ])
    expect(R.intersection([ 'a', 'b' ], 'ac')).eql([ 'a' ])

    expect(R.intersection([ 1, 2, 3, 4 ])([ 7, 6, 5, 4, 3 ])).eql([ 3, 4 ])
    expect(R.intersection([ 'a', 'b', 3, 4 ])([ 7, 'c', 'a', 4, 3 ])).eql([ 'a', 3, 4 ])
    expect(R.intersection([ 'a', 'b' ])('ac')).eql([ 'a' ])
  })
})
