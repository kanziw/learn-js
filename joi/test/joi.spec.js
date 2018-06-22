const Joi = require('joi')
const R = require('ramda')
const expect = require('chai').expect

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
})
