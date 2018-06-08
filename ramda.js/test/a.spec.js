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
      expect(idx).to.be.an('undefined')
      expect(arr).to.be.an('undefined')
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
      expect(idx).to.be.an('undefined')
      expect(arr).to.be.an('undefined')
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
