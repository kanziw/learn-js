const R = require('ramda')
const expect = require('chai').expect
const Maybe = require('ramda-fantasy').Maybe

describe('call', () => {
  it('simple', () => {
    expect(R.call(R.add, 1, 2)).eql(3)

    const add1 = R.call(R.add, 1)
    expect(add1).to.be.an('function')
    expect(add1(2)).eql(3)
  })

  it('curry', () => {
    const adder = R.call(R.add)

    expect(adder).to.be.an('function')
    expect(adder(1, 2)).eql(3)

    const add1 = adder(1)
    expect(add1).to.be.an('function')
    expect(add1(2)).eql(3)
  })
})

describe('chain', () => {
  /**
   * chain maps a function over a list and concatenates the results. chain is also known as flatMap in some libraries
   * Dispatches to the chain method of the second argument, if present, according to the FantasyLand Chain spec.
   *
   * 다른 라이브러리에서 일명 flatMap 이라 불리는 기능을 수행한다.
   */
  it('simple', () => {
    const duplicate = n => [ n, n ]
    expect(R.chain(duplicate, [ 1, 2, 3 ])).eql([ 1, 1, 2, 2, 3, 3 ])
    expect(R.chain(R.append, R.head)([ 1, 2, 3 ])).eql([ 1, 2, 3, 1 ])
    expect(R.chain(R.append, R.last)([ 1, 2, 3 ])).eql([ 1, 2, 3, 3 ])
  })
})

describe('clamp', () => {
  it('simple', () => {
    expect(R.clamp(1, 10, -5)).eql(1)
    expect(R.clamp(1, 10, 15)).eql(10)
    expect(R.clamp(1, 10, 4)).eql(4)
  })

  it('curry', () => {
    const curry = R.clamp(1, 10)
    expect(curry(-5)).eql(1)
    expect(curry(15)).eql(10)
    expect(curry(4)).eql(4)
  })

  it('clamp works also Date', () => {
    const [ past, now, future ] = [ new Date('2000-01-01'), new Date(), new Date('4000-01-01') ]
    const [ min, max ] = [ new Date('2018-01-01'), new Date('3000-01-01') ]
    const curry = R.clamp(min, max)

    expect(curry(now)).eql(now)
    expect(curry(past)).eql(min)
    expect(curry(future)).eql(max)
  })

  it('clamp works also String', () => {
    const [ A, B, C, D, E ] = [ 'A', 'B', 'C', 'D', 'E' ]
    const curry = R.clamp(B, D)

    expect(curry(C)).eql(C)
    expect(curry(A)).eql(B)
    expect(curry(E)).eql(D)
  })
})

describe('clone', () => {
  it('simple', () => {
    const orgObj = [ {}, {} ]
    const cloneObj = R.clone(orgObj)

    expect(cloneObj).eql(orgObj)
    expect(orgObj === cloneObj).to.be.false
    expect(orgObj[ 0 ] === cloneObj[ 0 ]).to.be.false
  })
})

describe('comparator', () => {
  it('simple', () => {
    const byAge = R.comparator((a, b) => a.age < b.age)
    const people = [
      { name: 'kanziw', age: 20 },
      { name: 'david', age: 30 },
      { name: 'reese', age: 10 },
    ]
    const sortedPeople = [
      { name: 'reese', age: 10 },
      { name: 'kanziw', age: 20 },
      { name: 'david', age: 30 },
    ]

    expect(R.sort(byAge, people)).eql(sortedPeople)
  })
})

describe('complement', () => {
  /**
   * 함수 결과값의 boolean 값을 뒤집는다.
   */
  it('simple', () => {
    const isNull = v => v === null
    const isNotNull = R.complement(isNull)

    expect(isNull(null)).eql(true)
    expect(isNotNull(null)).eql(false)
    expect(isNull(7)).eql(false)
    expect(isNotNull(7)).eql(true)
  })

  it('non boolean', () => {
    const add1 = R.add(1)

    const aa = R.complement(add1)
    expect(aa(-2)).eql(false)
    expect(aa(-1)).eql(true)
    expect(aa(2)).eql(false)
  })
})

describe('compose', () => {
  /**
   * compose(f, g)(x) => f(g(x))
   */
  it('simple', () => {
    expect(R.compose(Math.abs, R.add(1), R.multiply(2))(-4)).eql(7)
  })
})

describe('composeK', () => {
  /**
   * Returns the right-to-left Kleisli composition of the provided functions,
   * each of which must return a value of a type supported by chain.
   * R.composeK(h, g, f) is equivalent to R.compose(R.chain(h), R.chain(g), f).
   *
   * Monad 를 만족하는 데이터를 체이닝으로 compose 하는...가보다.
   */
  it('simple', () => {
    const get = R.curry((propName, obj) => Maybe(obj[ propName ]))

    const getStateCode = R.composeK(
      R.compose(Maybe.of, R.toUpper),
      get('state'),
      get('address'),
      get('user'),
    )

    expect(getStateCode({ 'user': { 'address': { 'state': 'ny' } } })).eql(Maybe.Just('NY'))
    expect(getStateCode({})).eql(Maybe.Nothing())
  })
})

describe('composeP', () => {
  /**
   * composeP 로 compose 되는 경우, 처음 함수는 무조건 Promise 를 반환해야 한다.
   * 처음만 Promise 를 반환하면 중간의 함수들은 Promise 반환 여부와 상관 없다.
   */
  it('simple', async () => {
    const db = {
      users: {
        JOE: {
          name: 'Joe',
          followers: [ 'STEVE', 'SUZY' ]
        }
      }
    }

    const resultArr = db.users.JOE.followers

    const lookupUser = (userId) => Promise.resolve(db.users[ userId ])
    const lookupFollowers = (user) => user.followers
    expect(await lookupUser('JOE').then(lookupFollowers)).eql(resultArr)

    const headCharacterOfFollowersForUser = R.composeP(R.head, R.head, lookupFollowers, lookupUser)
    expect(await headCharacterOfFollowersForUser('JOE')).eql('S')
  })

  it('first fn should return promise', async () => {
    const AAA = [ 'AAA', 'AAA' ]
    const BBB = [ 'BBB', 'BBB' ]

    const getA = () => AAA
    const getB = () => BBB
    const getAP = () => Promise.resolve(AAA)
    const getBP = () => Promise.resolve(BBB)

    expect(await R.composeP(getB, getAP, getA, getBP)()).eql(BBB)
    expect(() => R.composeP(getAP, getBP, getA)()).throw('f.apply(...).then is not a function')
  })
})
