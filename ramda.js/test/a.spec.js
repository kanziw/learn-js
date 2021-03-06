const R = require('ramda')
const expect = require('chai').expect

describe('add', () => {
  it('simple', () => {
    expect(R.add(1, 2)).eql(3)
  })

  it('curry', () => {
    const add3 = R.add(3)

    const testArr = [ [ 3, 6 ], [ 4, 7 ], [ 10, 13 ], [ -9, -6 ] ]
    expect(testArr.every(([ arg, sum ]) => add3(arg) === sum)).eql(true)
  })
})

describe('addIndex', () => {
  /**
   * Creates a new list iteration function from an existing one by adding two new parameters to its callback function
   *  : the current index, and the entire list.
   *
   * Array.prototype.filter 및 Array.prototype.map 의 콜백을 활용할 땐 3가지 인자를 사용할 수 있다.
   *  => (value, index, arr) => //
   * 하지만 R.filter 및 R.map 의 콜백을 활용할 땐 1가지 인자만 사용할 수 있다.
   *  => (value) => //
   * R.filter 및 R.map 의 콜백을 활용할 때 3가지 인자 (value, index, arr) 를 모두 활용하기 위해 R.addIndex 을 사용한다.
   */
  const testArr = [ 'one', 'two', 'three', 'four' ]
  it('filter, and curry', () => {
    const filteredArr = [ 'two', 'four' ]

    expect(R.filter((val, idx, arr) => {
      expect(idx).to.be.undefined
      expect(arr).to.be.undefined
      return val === 'two' || val === 'four'
    }, testArr)).eql(filteredArr)

    const filterIndexed = R.addIndex(R.filter)
    expect(filterIndexed((val, idx, arr) => {
      expect(val).to.be.an('string')
      expect(arr).eql(testArr)
      return idx % 2
    }, testArr)).eql(filteredArr)

    const curried = filterIndexed((_, idx) => idx % 2)
    expect(curried(testArr)).eql(filteredArr)
  })

  it('map, and curry', () => {
    const mappedArr = [ '0-one', '1-two', '2-three', '3-four' ]

    let _idx = 0
    expect(R.map((val, idx, arr) => {
      expect(idx).to.be.undefined
      expect(arr).to.be.undefined
      return _idx++ + '-' + val
    }, testArr)).eql(mappedArr)

    const mapIndexed = R.addIndex(R.map)
    expect(mapIndexed((val, idx, arr) => {
      expect(val).to.be.an('string')
      expect(arr).eql(testArr)
      return idx + '-' + val
    }, testArr)).eql(mappedArr)

    const curried = mapIndexed((val, idx) => idx + '-' + val)
    expect(curried(testArr)).eql(mappedArr)
  })
})

describe('adjust', () => {
  /**
   * Applies a function to the value at the given index of an array,
   * returning a new copy of the array with the element at the given index replaced
   * with the result of the function application.
   *
   * (function, idx, array) => //
   * Array 의 idx 요소에 function 을 수행한다.
   */

  const testArr = [ 1, 2, 3 ]
  const resultArr = [ 1, 12, 3 ]
  const add10 = R.add(10)

  it('simple', () => {
    expect(R.adjust(add10, 1, testArr)).eql(resultArr)
  })

  it('curry', () => {
    const curry1 = R.adjust(add10)
    expect(curry1).to.be.an('function')
    expect(curry1(1)(testArr)).eql(resultArr)

    const curry2 = curry1(1)
    expect(curry2).to.be.an('function')
    expect(curry2(testArr)).eql(resultArr)
  })
})

describe('all', () => {
  const testArr = [ 1, 2, 3 ]
  const testerFnTrue = n => n > 0
  const testerFnFalse = n => n > 1

  it('simple', () => {
    expect(R.all(testerFnTrue, testArr)).to.be.true
    expect(R.all(testerFnFalse, testArr)).to.be.false
  })

  it('curry', () => {
    const curryTrue = R.all(testerFnTrue)
    const curryFalse = R.all(testerFnFalse)

    expect(curryTrue(testArr)).to.be.true
    expect(curryFalse(testArr)).to.be.false
  })
})

describe('allPass', () => {
  /**
   * R.all 은 array 의 모든 요소가 특정 함수를 통과하느냐 라면
   * R.allPass 는 특정 한 요소가 여러 함수의 조건을 모두 만족하는가 를 확인한다.
   *
   * iterable 한 첫번째 인자만 허용하며, 즉시실행 용으론 사용할 수 없다.
   */

  const isStartsWithA = str => str.startsWith('a')
  const isEndsWithD = str => str.endsWith('d')

  it('simple', () => {
    const isStartsWithAAndEndsWithD = R.allPass([ isStartsWithA, isEndsWithD ])
    expect(isStartsWithAAndEndsWithD('abcd')).to.be.true
    expect(isStartsWithAAndEndsWithD('abc')).to.be.false
  })

  it('only one argument', () => {
    const isStartsWithAAndEndsWithD = R.allPass([ isStartsWithA ], [ isEndsWithD ])
    expect(isStartsWithAAndEndsWithD('abcd')).to.be.true
    // ???????????!!!!!!!!!!
    expect(isStartsWithAAndEndsWithD('abc')).to.be.true
  })

  it('argument should be array', () => {
    expect(() => R.allPass(isStartsWithA)).throw('list must be array or iterable')
  })

  it('only curry', () => {
    expect(R.allPass([ isStartsWithA, isEndsWithD ], 'abcd')).to.not.be.an('boolean')
    expect(R.allPass([ isStartsWithA, isEndsWithD ], 'abcd')).to.be.an('function')
  })
})

describe('always', () => {
  /**
   * Returns a function that always returns the given value.
   * Note that for non-primitives the value returned is a reference to the original value.
   *
   * 항상 자기 자신을 반환한다.
   */

  it('simple', () => {
    const getTrue = R.always(true)
    expect(getTrue).to.be.an('function')
    expect(getTrue()).to.be.true

    const testArr = [ 1, 'a', {}, { a: 1 }, [], [ 1, false ] ]
    testArr.forEach(val => expect(R.always(val)()).eql(val))
  })
})

describe('and', () => {
  /**
   * see also R.both
   */

  it('simple', () => {
    expect(R.and(true, true)).eql(true)
    expect(R.and(true, false)).eql(false)
    expect(R.and(false, true)).eql(false)
    expect(R.and(false, false)).eql(false)
  })

  it('마지막 falsy 한 값, 또는 마지막 값이 반환된다.', () => {
    expect(R.and(1, 'a')).eql('a')
    expect(R.and(1, '')).eql('')
    expect(R.and(0, 'a')).eql(0)
    expect(R.and(0, '')).eql(0)

    // like &&
    expect(1 && 'a').eql('a')
    expect(1 && '').eql('')
    expect(0 && 'a').eql(0)
    expect(0 && '').eql(0)
  })
})

describe('any', () => {
  const testArr = [ 1, 2, 3 ]
  const testerFnTrue = n => n > 1
  const testerFnFalse = n => n > 5

  it('simple', () => {
    expect(R.any(testerFnTrue, testArr)).to.be.true
    expect(R.any(testerFnFalse, testArr)).to.be.false
  })

  it('curry', () => {
    const curryTrue = R.any(testerFnTrue)
    const curryFalse = R.any(testerFnFalse)

    expect(curryTrue(testArr)).to.be.true
    expect(curryFalse(testArr)).to.be.false
  })
})

describe('anyPass', () => {
  /**
   * R.any 은 array 의 한 요소라도 특정 함수를 통과하느냐 라면
   * R.anyPass 는 특정 한 요소가 여러 함수 중 1개라도 만족하는가 를 확인한다.
   *
   * iterable 한 첫번째 인자만 허용하며, 즉시실행 용으론 사용할 수 없다.
   */

  const isStartsWithA = str => str.startsWith('a')
  const isEndsWithD = str => str.endsWith('d')

  it('simple', () => {
    const isStartsWithAAndEndsWithD = R.anyPass([ isStartsWithA, isEndsWithD ])
    expect(isStartsWithAAndEndsWithD('abc')).to.be.true
    expect(isStartsWithAAndEndsWithD('bc')).to.be.false
  })

  it('only one argument', () => {
    const isStartsWithAAndEndsWithD = R.anyPass([ isStartsWithA ], [ isEndsWithD ])
    expect(isStartsWithAAndEndsWithD('abcd')).to.be.true
    // ???????????!!!!!!!!!!
    expect(isStartsWithAAndEndsWithD('bcd')).to.be.false
  })

  it('argument should be array', () => {
    expect(() => R.anyPass(isStartsWithA)).throw('list must be array or iterable')
  })

  it('only curry', () => {
    expect(R.anyPass([ isStartsWithA, isEndsWithD ], 'abcd')).to.not.be.an('boolean')
    expect(R.anyPass([ isStartsWithA, isEndsWithD ], 'abcd')).to.be.an('function')
  })
})

describe('ap', () => {
  /**
   * 배열로 담긴 함수들을 각각 수행하고 그 결과를 concat 한다.
   * (function[], [...]) => [... ...]
   */

  const multiply2 = n => n * 2
  const add10 = n => n + 10
  const minus10 = n => n - 10

  const addPrefix_ = str => '_' + str
  const toUpper = str => str.toUpperCase()

  const testFnsNumber = [ multiply2, add10, minus10 ]
  const testFnsString = [ addPrefix_, toUpper ]

  const testArrNumber = [ 1, 2, 3 ]
  const testArrString = [ 'kanziw', 'david' ]

  const resultArrNumber = [ 2, 4, 6, 11, 12, 13, -9, -8, -7 ]
  const resultArrString = [ '_kanziw', '_david', 'KANZIW', 'DAVID' ]

  it('simple', () => {
    expect(R.ap(testFnsNumber, testArrNumber)).eql(resultArrNumber)
    expect(R.ap(testFnsString, testArrString)).eql(resultArrString)
  })

  it('curry', () => {
    const curryNumber = R.ap(testFnsNumber)
    expect(curryNumber(testArrNumber)).eql(resultArrNumber)

    const curryString = R.ap(testFnsString)
    expect(curryString(testArrString)).eql(resultArrString)
  })

  /**
   * R.ap can also be used as S combinator when only two functions are passed
   *
   * 인자는 2개까지만 인식하며, 이 경우 첫번째 함수는
   *   "본래의 인자" => "두번째 함수 결과" => //
   * 의 역할을 수행한다.
   */
  it('two function args', () => {
    expect(R.ap(A => B => [ A, B ].join('___'), R.always('B'))('A')).eql('A___B')
    let _ = '!'
    expect(R.ap(R.add, R.always(2), () => _ = '?')(1)).eql(3)
    expect(_).eql('!')
  })
})

describe('aperture', () => {
  /**
   * (n, array) => [][] || []
   * array 에 담긴 요소를 n 개씩 차례로 묶어 반환한다.
   * array.length > n 인 경우 빈 배열이 반환된다.
   */
  it('simple', () => {
    expect(R.aperture(2, [ 1, 2, 3, 4, 5 ])).eql([ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ])
    expect(R.aperture(3, [ 1, 2, 3, 4, 5 ])).eql([ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ] ])
    expect(R.aperture(5, [ 1, 2, 3, 4, 5 ])).eql([ [ 1, 2, 3, 4, 5 ] ])
    expect(R.aperture(6, [ 1, 2, 3, 4, 5 ])).eql([])
  })

  it('curry', () => {
    const curry5 = R.aperture(5)
    expect(curry5([ 1, 2, 3, 4, 5 ])).eql([ [ 1, 2, 3, 4, 5 ] ])

    const curry6 = R.aperture(6)
    expect(curry6([ 1, 2, 3, 4, 5 ])).eql([])
  })
})

describe('append', () => {
  /**
   * array 뒤쪽에 요소를 추가한다.
   */
  it('simple', () => {
    expect(R.append(1, [])).eql([ 1 ])
    expect(R.append(1, [ 2 ])).eql([ 2, 1 ])
    expect(R.append(1, [ 2, 3 ])).eql([ 2, 3, 1 ])
    expect(R.append([ 1 ], [ 2, 3 ])).eql([ 2, 3, [ 1 ] ])
  })

  it('curry', () => {
    const curry = R.append(1)
    expect(curry([])).eql([ 1 ])
    expect(curry([ 2 ])).eql([ 2, 1 ])
  })
})

describe('apply', () => {
  const testArr = [ 1, 2, 3, -99, 42, 6, 7 ]
  const result = 42

  it('simple', () => {
    expect(Math.max(...testArr)).eql(result)
    expect(R.apply(Math.max, testArr)).eql(result)
  })

  it('curry', () => {
    const curry = R.apply(Math.max)
    expect(curry(testArr)).eql(result)
  })
})

describe('applySpec', () => {
  /**
   * 템플릿에 주어진 함수들을 인자로 실행시켜 템플릿을 만든다.
   * 모든 요소는 함수로 이루어져 있어야 한다.
   */
  it('simple', () => {
    const spec = {
      id: R.always('ID'),
      add: R.add,
      mul: R.multiply,
      nestedAdd: { add: R.add, str: R.always('STR') },
      nestedMul: { mul: [ R.multiply, R.always('M') ] },
      sum: (...args) => R.sum(args),
      all: R.all,
    }

    const getSpec = R.applySpec(spec)

    // R.add & R.multiply is binary function.
    expect(getSpec(2, 4, 6)).eql({
      id: 'ID',
      add: 6,
      mul: 8,
      nestedAdd: { add: 6, str: 'STR' },
      nestedMul: { mul: [ 8, 'M' ] },
      sum: 12,
      all: true,
    })
  })
})

describe('applyTo', () => {
  /**
   * 1번 인자를 2번 함수의 인자로 사용한다.
   * (arg, fn) => fn(arg)
   */
  it('simple', () => {
    expect(R.applyTo(1, R.add(3))).eql(4)
  })

  it('curry', () => {
    const argA = R.applyTo('A')
    expect(argA(R.always)()).eql('A')

    const arg1 = R.applyTo(1)
    expect(arg1(R.add(4))).eql(5)
  })
})

describe('ascend', () => {
  /**
   * Makes an ascending comparator function out of a function that returns a value that can be compared with < and >.
   * 오름차순으로 정렬하기 위해 사용될 comparator function 을 반환한다.
   */
  it('simple', () => {
    expect([ 1, 3, 0, 2, 5, 4 ].sort(R.ascend(R.identity))).eql([ 0, 1, 2, 3, 4, 5 ])
    expect([ { a: 5 }, { a: 0 } ].sort(R.ascend(x => x.a))).eql([ { a: 0 }, { a: 5 } ])
  })
})

describe('assoc', () => {
  /**
   * (key, value, obj) => obj /w {key: value}
   * key 가 중복되면 overriding 한다.
   * copy 된 객체가 반환된다.
   */
  const testObj = { a: 1, b: 2, c: -1 }
  const resultObj = { a: 1, b: 2, c: 3 }

  it('simple', () => {
    expect(R.assoc('c', 3, testObj)).eql(resultObj)
    expect(testObj).eql({ a: 1, b: 2, c: -1 })
  })

  it('curry', () => {
    const curryKey = R.assoc('c')
    expect(curryKey).to.be.an('function')
    expect(curryKey(3, resultObj)).eql(resultObj)

    const curryKeyAndValue = curryKey(3)
    expect(curryKeyAndValue).to.be.an('function')
    expect(curryKeyAndValue(testObj)).eql(resultObj)
  })

  it('do not support deep path', () => {
    const testObj = { a: { b: { c: 0 } } }
    expect(R.assoc([ 'a', 'b', 'c' ], 3, testObj)).eql({ a: { b: { c: 0 } }, 'a,b,c': 3 })
    expect(R.assoc('a.b.c', 3, testObj)).eql({ a: { b: { c: 0 } }, 'a.b.c': 3 })
  })
})

describe('assocPath', () => {
  const testObj = { a: { b: { c: 0 } } }
  const resultObj = { a: { b: { c: 3 } } }

  it('simple', () => {
    expect(R.assocPath([ 'a', 'b', 'c' ], 3, testObj)).eql(resultObj)
    expect(testObj).eql({ a: { b: { c: 0 } } })
  })

  it('array idx supported', () => {
    const testObj = { a: [ { c: 0 } ] }
    const resultObj = { a: [ { c: 3 } ] }

    expect(R.assocPath([ 'a', 0, 'c' ], 3, testObj)).eql(resultObj)
    expect(testObj).eql({ a: [ { c: 0 } ] })
  })

  it('curry', () => {
    const curryKey = R.assocPath([ 'a', 'b', 'c' ])
    expect(curryKey).to.be.an('function')
    expect(curryKey(3, resultObj)).eql(resultObj)

    const curryKeyAndValue = curryKey(3)
    expect(curryKeyAndValue).to.be.an('function')
    expect(curryKeyAndValue(testObj)).eql(resultObj)
  })
})
