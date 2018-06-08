const R = require('ramda')
const expect = require('chai').expect

describe('add', function () {
  it('simple', () => {
    expect(R.add(1, 2)).eql(3)
  })

  it('curry', () => {
    const add3 = R.add(3)

    const testArr = [ [ 3, 6 ], [ 4, 7 ], [ 10, 13 ], [ -9, -6 ] ]
    expect(testArr.every(([ arg, sum ]) => add3(arg) === sum)).eql(true)
  })
})
