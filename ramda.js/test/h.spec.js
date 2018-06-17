const R = require('ramda')
const expect = require('chai').expect

class Rectangle {
  constructor (width, height) {
    this.width = width
    this.height = height
  }

  area () {
    return this.width * this.height
  }
}
const square = new Rectangle(2, 2)

describe('has', () => {
  /**
   * (key, object) => boolean
   * object 에 key 가 존재하는가?
   *
   * prototype chain 을 통해 갖고 있는 property 는 검사하지 못한다.
   */
  it('simple', () => {
    expect(R.has('name', { name: 'alice' })).to.be.true
    expect(R.has('name', { name: 'bob' })).to.be.true
    expect(R.has('name', {})).to.be.false

    expect(R.has('width', square)).to.be.true
    expect(R.has('area', square)).to.be.false
  })

  it('curry', () => {
    expect(R.has('name')({ name: 'alice' })).to.be.true
    expect(R.has('name')({ name: 'bob' })).to.be.true
    expect(R.has('name')({})).to.be.false

    expect(R.has('width')(square)).to.be.true
    expect(R.has('area')(square)).to.be.false

    const pointHas = R.has(R.__, { x: 0, y: 0 })
    expect(pointHas('x')).to.be.true
    expect(pointHas('y')).to.be.true
    expect(pointHas('z')).to.be.false
  })
})

describe('hasIn', () => {
  /**
   * prototype chain 을 통해 갖고 있는 property 도 확인할 수 있다.
   */
  it('simple & curry', () => {
    expect(R.hasIn('width', square)).to.be.true
    expect(R.hasIn('area', square)).to.be.true
    expect(R.hasIn('deep', square)).to.be.false
    expect(R.hasIn('name', { name: 'kanziw' })).to.be.true
    expect(R.hasIn('name', {})).to.be.false

    expect(R.hasIn('width')(square)).to.be.true
    expect(R.hasIn('area')(square)).to.be.true
    expect(R.hasIn('deep')(square)).to.be.false
    expect(R.hasIn('name')({ name: 'kanziw' })).to.be.true
    expect(R.hasIn('name')({})).to.be.false
  })
})

describe('head', () => {
  it('simple', () => {
    expect(R.head([ 'fi', 'fo', 'fum' ])).eql('fi')
    expect(R.head([])).to.be.undefined

    expect(R.head('abc')).eql('a')
    expect(R.head('')).eql('')
  })
})
