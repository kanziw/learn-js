const R = require('ramda')
const expect = require('chai').expect

describe('groupBy', () => {
  const testArr = [
    { name: 'Kanziw', score: 100 },
    { name: 'Abby', score: 84 },
    { name: 'David', score: 70 },
    { name: 'Jack', score: 69 },
    { name: 'Eddy', score: 58 },
  ]
  const resultObj = {
    'A': [ { name: 'Kanziw', score: 100 } ],
    'B': [ { name: 'Abby', score: 84 }, ],
    'C': [ { name: 'David', score: 70 } ],
    'D': [ { name: 'Jack', score: 69 }, ],
    'F': [ { name: 'Eddy', score: 58 } ],
  }

  const getGradeByScore = ({ score }) => R.cond([
    [ R.flip(R.lt)(65), R.always('F') ],
    [ R.flip(R.lt)(70), R.always('D') ],
    [ R.flip(R.lt)(80), R.always('C') ],
    [ R.flip(R.lt)(90), R.always('B') ],
    [ R.T, R.always('A') ]
  ])(score)


  it('simple & curry', () => {
    expect(R.groupBy(getGradeByScore, testArr)).eql(resultObj)
    expect(R.groupBy(getGradeByScore)(testArr)).eql(resultObj)
  })
})

describe('groupWith', () => {
  const isVowel = R.pipe(
    R.toLower,
    R.anyPass(R.map(R.equals, 'aeiou'))
  )

  const testSet = [
    {
      pred: R.equals,
      input: [ 0, 1, 1, 2, 3, 5, 8, 13, 21 ],
      output: [ [ 0 ], [ 1, 1 ], [ 2 ], [ 3 ], [ 5 ], [ 8 ], [ 13 ], [ 21 ] ]
    },
    {
      pred: (a, b) => a + 1 === b,
      input: [ 0, 1, 1, 2, 3, 5, 8, 13, 21 ],
      output: [ [ 0, 1 ], [ 1, 2, 3 ], [ 5 ], [ 8 ], [ 13 ], [ 21 ] ],
    },
    {
      pred: (a, b) => a % 2 === b % 2,
      input: [ 0, 1, 1, 2, 3, 5, 8, 13, 21 ],
      output: [ [ 0 ], [ 1, 1 ], [ 2 ], [ 3, 5 ], [ 8 ], [ 13, 21 ] ],
    },
    {
      pred: R.eqBy(isVowel),
      input: 'aestiou',
      output: [ 'ae', 'st', 'iou' ],
    },
  ]

  it('simple', () => {
    testSet.forEach(({ pred, input, output }) => {
      expect(R.groupWith(pred, input)).eql(output)
      expect(R.groupWith(pred)(input)).eql(output)
    })
  })
})
