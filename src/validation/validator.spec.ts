import 'mocha'

import { expect } from 'chai'
import * as joi from 'joi'

import { Validator } from './validator'

describe('test Validator', () => {
  it('should return passed object', async () => {
    const schema = joi.object().keys({
      foo: joi.string().required()
    })
    const input = {
      foo: 'bar'
    }
    const actual = await Validator.validate<{ foo: string }>(input, schema)
    expect(actual.foo).is.equal('bar')
  })

  it('should throw error object', async () => {
    const schema = joi.object().keys({
      foo: joi.string().required()
    })
    const input = {
      woo: 'bar'
    }
    await Validator.validate<{ foo: string }>(input, schema)
      .catch(err => {
        expect(err).is.not.null
      })
  })
})
