const R = require('ramda')
const expect = require('chai').expect

describe('join', () => {
  it('simple & curry', () => {
    expect(R.join(' ', [ 3, 'a', 'b', 1, 1.2 ])).eql('3 a b 1 1.2')
    expect(R.join('/', [ 3, 'a', 'b', 1, 1.2 ])).eql('3/a/b/1/1.2')

    expect(R.join(' ')([ 3, 'a', 'b', 1, 1.2 ])).eql('3 a b 1 1.2')
    expect(R.join('/')([ 3, 'a', 'b', 1, 1.2 ])).eql('3/a/b/1/1.2')
  })
})
