const R = require('ramda')
const expect = require('chai').expect

describe('dec', () => {
  it('simple', () => {
    expect(R.dec(30)).eql(29)
    expect(R.dec(29)).eql(28)
    expect(R.dec(28)).eql(27)
  })
})

describe('defaultTo', () => {
  it('simple', () => {
    const defaultValue = 42
    const defaultTo42 = R.defaultTo(defaultValue)

    expect(defaultTo42(null)).eql(defaultValue)
    expect(defaultTo42(undefined)).eql(defaultValue)
    expect(defaultTo42(NaN)).eql(defaultValue)
    expect(defaultTo42('Ramda')).eql('Ramda')
  })
})

describe('descend', () => {
  /**
   * Makes a descending comparator function out of a function that returns a value that can be compared with < and >.
   * 내림차순으로 정렬하기 위해 사용될 comparator function 을 반환한다.
   */
  it('simple', () => {
    expect([ 1, 3, 0, 2, 5, 4 ].sort(R.descend(R.identity))).eql([ 5, 4, 3, 2, 1, 0 ])
    expect([ { a: 5 }, { a: 0 } ].sort(R.descend(x => x.a))).eql([ { a: 5 }, { a: 0 } ])
  })
})

describe('difference', () => {
  /**
   * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
   * Objects and Arrays are compared in terms of value equality, not reference equality.
   *
   * Objects 와 Arrays 를 서로 값 비교하여 차집합을 구한다.
   */
  it('simple', () => {
    expect(R.difference([ 1, 2, 3, 4 ], [ 7, 6, 5, 4, 3 ])).eql([ 1, 2 ])
    expect(R.difference([ 7, 6, 5, 4, 3 ], [ 1, 2, 3, 4 ])).eql([ 7, 6, 5 ])
    expect(R.difference([ { a: 1 }, { b: 2 } ], [ { a: 1 }, { c: 3 } ])).eql([ { b: 2 } ])
  })

  it('curry', () => {
    const curry = R.difference([ 1, 2, 3, 4 ])
    expect(curry([ 2, 3, 4 ])).eql([ 1 ])
    expect(curry([ 3, 4 ])).eql([ 1, 2 ])
    expect(curry([ 4 ])).eql([ 1, 2, 3 ])
  })
})

describe('differenceWith', () => {
  it('simple', () => {
    const cmp = (x, y) => x.a === y.a - 1
    const l1 = [ { a: 1 }, { a: 2 }, { a: 3 } ]
    const l2 = [ { a: 3 }, { a: 4 } ]

    expect(R.differenceWith(cmp, l1, l2)).eql([ { a: 1 } ])
    expect(R.difference(l1, l2)).eql([ { a: 1 }, { a: 2 } ])
  })
})

describe('dissoc', () => {
  /**
   * Returns a new object that does not contain a `prop` property.
   * `prop` 에 해당하는 key 를 object 에서 제외한 새로운 Object 를 반환한다.
   */
  it('simple', () => {
    expect(R.dissoc('b', { a: 1, b: 2, c: 3 })).eql({ a: 1, c: 3 })
  })

  it('curry', () => {
    const curry = R.dissoc('b')
    expect(curry({ a: 1, b: 2, c: 3 })).eql({ a: 1, c: 3 })
  })
})

describe('dissocPath', () => {
  /**
   * Makes a shallow clone of an object, omitting the property at the given path.
   * Note that this copies and flattens prototype properties onto the new object as well.
   * All non-primitive properties are copied by reference.
   *
   * (pathArray, object) => object
   * pathArray 에 있는 key 값이 제거된, 복사된 object 가 반환된다.
   */

  const testObj = { a: { b: { c: 42, d: [ 40, { e: 5, f: 6 } ] } } }
  const resultObj = { a: { b: { d: [ 40, { e: 5, f: 6 } ] } } }
  const resultArr = { a: { b: { c: 42, d: [ 40, { f: 6 } ] } } }

  it('simple', () => {
    expect(R.dissocPath([ 'a', 'b', 'c' ], testObj)).eql(resultObj)
  })

  it('curry', () => {
    const curry = R.dissocPath([ 'a', 'b', 'c' ])
    expect(curry(testObj)).eql(resultObj)
  })

  it('array path supported', () => {
    expect(R.dissocPath([ 'a', 'b', 'd', 1, 'e' ], testObj)).eql(resultArr)
  })
})
