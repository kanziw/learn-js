const Joi = require('joi')
const R = require('ramda')
const Promise = require('bluebird')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

chai.use(chaiHttp)
const expect = chai.expect

const catchAsyncError = async promise => {
  try {
    await Promise.resolve(promise)
    expect(true).to.be.false
  } catch (ex) {
    return ex
  }
}

describe('validate', () => {
  describe('validate style', () => {
    let [ retErr, retValue ] = []
    beforeEach(() => {
      retErr = undefined
      retValue = undefined
    })

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
    const validate = obj => Joi.validate(obj, schema)

    it('simple', async () => {
      const testSet = [ {}, { num: 1 }, { num: 1, str: 'a' } ]
      await Promise.each(testSet, obj => validate(obj).then(v => expect(v).eql(obj)))
    })

    it('error', async () => {
      const err = await catchAsyncError(validate({ num: 'a' }))
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

  describe('required', () => {
    const schema = {
      num: Joi.number(),
      str: Joi.string().required(),
    }
    const validate = obj => Joi.validate(obj, schema)

    it('simple', async () => {
      const obj = { num: 1, str: 'a' }
      await validate(obj).then(v => expect(v).eql(obj))
    })

    it('error', async () => {
      const { details: [ detail ] } = await catchAsyncError(validate({ num: 1 }))
      expect(detail).eql({
        message: '"str" is required',
        path: [ 'str' ],
        type: 'any.required',
        context: { key: 'str', label: 'str' }
      })
    })
  })
})

describe('express', () => {
  const ok = r => expect(r.body.ok).eql(1)

  it('params', async () => {
    await chai.request(app).get('/user/kanziw').then(ok)
  })

  it('body', async () => {
    await chai.request(app).post('/user')
      .send({ username: 'kanziw', email: 'kanziwoong@gmail.com', pw: '123456' })
      .then(ok)
  })
})
