const Joi = require('joi')
const R = require('ramda')
const Promise = require('bluebird')
const expect = require('chai').expect

const catchAsyncError = async promise => {
  try {
    await Promise.resolve(promise)
    expect(true).to.be.false
  } catch (ex) {
    return ex
  }
}

describe('validate', () => {
  let [ retErr, retValue ] = []

  beforeEach(() => {
    retErr = undefined
    retValue = undefined
  })

  describe('validate style', () => {
    const schema = {
      num: Joi.number(),
      str: Joi.string(),
    }

    it('callback', () => {
      const ret = Joi.validate({ num: 1 }, schema, (err, value) => {
        retErr = err
        retValue = value
      })

      expect(ret).to.be.undefined
      expect(retErr).to.be.null
      expect(retValue).eql({ num: 1 })
    })

    it('non-callback', async () => {
      const ret = Joi.validate({ num: 1 }, schema)
      expect(R.keys(ret)).eql([ 'error', 'value', 'then', 'catch' ])

      expect(ret.error).to.be.null
      expect(ret.value).eql({ num: 1 })

      retValue = await ret.then(value => value)
      let hasError = false
      retErr = await ret.catch(ex => {
        hasError = true
        return ex
      })

      expect(retValue).eql({ num: 1 })
      expect(retErr).eql({ num: 1 })    // catch also return value
      expect(hasError).to.be.false      // catch scope does not be reached
    })
  })

  describe('optional', () => {
    const schema = {
      num: Joi.number(),
      str: Joi.string(),
    }

    it('simple', async () => {
      const testSet = [ {}, { num: 1 }, { num: 1, str: 'a' } ]
      await Promise.each(testSet, obj => Joi.validate(obj, schema).then(v => expect(v).eql(obj)))
    })

    it('error', async () => {
      const err = await catchAsyncError(Joi.validate({ num: 'a' }, schema))
      expect(R.keys(err)).eql([ 'isJoi', 'name', 'details', '_object', 'annotate' ])

      expect(err.isJoi).to.be.true
      expect(err.name).eql('ValidationError')
      expect(err._object).eql({ num: 'a' })
      expect(err.annotate).to.be.an('function')

      expect(err.details).to.be.an.instanceOf(Array).lengthOf(1)
      expect(err.details[ 0 ]).eql({
        message: '"num" must be a number',
        path: [ 'num' ],
        type: 'number.base',
        context: { key: 'num', label: 'num' }
      })
    })
  })
})
