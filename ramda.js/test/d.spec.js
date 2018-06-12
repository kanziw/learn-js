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

describe('divide', () => {
  it('simple', () => {
    expect(R.divide(71, 100)).eql(0.71)
    expect(R.divide(71, 0)).eql(Number.POSITIVE_INFINITY)
  })

  it('curry', () => {
    const half = R.divide(R.__, 2)
    expect(half(42)).eql(21)

    const reciprocal = R.divide(1)
    expect(reciprocal(4)).eql(0.25)
  })
})

describe('drop', () => {
  /**
   * Returns all but the first n elements of the given list, string, or transducer/transformer (or object with a drop method).
   * Dispatches to the drop method of the second argument, if present.
   *
   * (number, array or string) => array or string
   * 앞에서 number 개수만큼 요소를 제거한 결과를 반환한다.
   */
  it('simple', () => {
    expect(R.drop(2, [ 1, 2, 3, 4 ])).eql([ 3, 4 ])
    expect(R.drop(3, [ 1, 2, 3, 4 ])).eql([ 4 ])
    expect(R.drop(4, [ 1, 2, 3, 4 ])).eql([])
    expect(R.drop(5, [ 1, 2, 3, 4 ])).eql([])

    expect(R.drop(5, 'kanziw')).eql('w')
    expect(R.drop(6, 'kanziw')).eql('')
    expect(R.drop(7, 'kanziw')).eql('')
  })

  it('curry', () => {
    expect(R.drop(5)('kanziw')).eql('w')
  })
})

describe('dropLast', () => {
  /**
   * (number, array or string) => array or string
   * 뒤에서 number 개수만큼 요소를 제거한 결과를 반환한다.
   */
  it('simple', () => {
    expect(R.dropLast(2, [ 1, 2, 3, 4 ])).eql([ 1, 2 ])
    expect(R.dropLast(3, [ 1, 2, 3, 4 ])).eql([ 1 ])
    expect(R.dropLast(4, [ 1, 2, 3, 4 ])).eql([])
    expect(R.dropLast(5, [ 1, 2, 3, 4 ])).eql([])

    expect(R.dropLast(5, 'kanziw')).eql('k')
    expect(R.dropLast(6, 'kanziw')).eql('')
    expect(R.dropLast(7, 'kanziw')).eql('')
  })

  it('curry', () => {
    expect(R.dropLast(5)('kanziw')).eql('k')
  })
})

describe('dropRepeats', () => {
  /**
   * Returns a new list without any consecutively repeating elements.
   * R.equals is used to determine equality.
   * Acts as a transducer if a transformer is given in list position.
   *
   * 연속으로 반복되는 같은 값이 나오면 해당 값을 제거한다.
   * Unique 한 요소를 반환하진 않고 연속으로 반복되는 값만 제거한다.
   * 값 비교는 R.equals 가 사용된다.
   */
  it('simple', () => {
    expect(R.dropRepeats([ 1, 1, 1, 2, 3, 4, 4, 2, 2, 1 ])).eql([ 1, 2, 3, 4, 2, 1 ])
  })
})

describe('dropRepeatsWith', () => {
  /**
   * Returns a new list without any consecutively repeating elements. Equality is determined by applying the supplied predicate to each pair of consecutive elements.
   * The first element in a series of equal elements will be preserved.
   * Acts as a transducer if a transformer is given in list position.
   *
   * (compFn, array) => array
   * compFn 으로 비교하여 연속으로 반복되는 값이 나오면 해당 값을 제거한다.
   */

  const testArr = [ 1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3 ]
  const resultArr = [ 1, 3, 4, -5, 3 ]
  const compFn = R.curry((n1, n2) => Math.abs(n1) === Math.abs(n2))

  it('simple', () => {
    expect(R.dropRepeatsWith(compFn, testArr)).eql(resultArr)
  })

  it('curry', () => {
    expect(R.dropRepeatsWith(compFn)(testArr)).eql(resultArr)
  })
})

describe('dropWhile', () => {
  /**
   * Returns a new list excluding the leading elements of a given list which satisfy the supplied predicate function.
   * It passes each value to the supplied predicate function, skipping elements while the predicate function returns true.
   * The predicate function is applied to one argument: (value).
   *
   * Dispatches to the dropWhile method of the second argument, if present.
   * Acts as a transducer if a transformer is given in list position.
   *
   * (compFn, array) => array
   * compFn 의 결과가 false 값이 나올 때 까지 앞의 요소들을 제거한다.
   */

  const testArr = [ 1, 2, 3, 4, 3, 2, 1 ]

  it('simple', () => {
    expect(R.dropWhile(n => n <= 2, testArr)).eql([ 3, 4, 3, 2, 1 ])
    expect(R.dropWhile(n => n < 10, testArr)).eql([])

    expect(R.dropWhile(s => s !== 'i', 'kanziw')).eql('iw')
    expect(R.dropWhile(s => s !== 'y', 'kanziw')).eql('')
  })

  it('curry', () => {
    expect(R.dropWhile(n => n <= 2)(testArr)).eql([ 3, 4, 3, 2, 1 ])
    expect(R.dropWhile(n => n < 10)(testArr)).eql([])

    expect(R.dropWhile(s => s !== 'i')('kanziw')).eql('iw')
    expect(R.dropWhile(s => s !== 'y')('kanziw')).eql('')
  })
})

describe('dropLastWhile', () => {
  /**
   * (compFn, array) => array
   * compFn 의 결과가 false 값이 나올 때 까지 뒤 요소들을 제거한다.
   */

  const testArr = [ 1, 2, 3, 4, 3, 2, 1 ]

  it('simple', () => {
    expect(R.dropLastWhile(n => n <= 2, testArr)).eql([ 1, 2, 3, 4, 3 ])
    expect(R.dropLastWhile(n => n < 10, testArr)).eql([])

    expect(R.dropLastWhile(s => s !== 'i', 'kanziw')).eql('kanzi')
    expect(R.dropLastWhile(s => s !== 'y', 'kanziw')).eql('')
  })

  it('curry', () => {
    expect(R.dropLastWhile(n => n <= 2)(testArr)).eql([ 1, 2, 3, 4, 3 ])
    expect(R.dropLastWhile(n => n < 10)(testArr)).eql([])

    expect(R.dropLastWhile(s => s !== 'i')('kanziw')).eql('kanzi')
    expect(R.dropLastWhile(s => s !== 'y')('kanziw')).eql('')
  })
})
