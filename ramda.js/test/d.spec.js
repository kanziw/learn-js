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
