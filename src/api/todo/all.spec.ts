import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoAll } from '.'
import { CommonQuery } from '../../service/common-query'

describe('test TodoAll.controller', () => {
  let findManyByQueryStub

  afterEach(() => {
    findManyByQueryStub.restore()
  })

  it('should return 200', async () => {
    const query = {}
    const req: any = { query }
    const docs = [{ foo: 'bar' }]
    findManyByQueryStub = sinon.stub(CommonQuery, 'findManyByQuery').returns(docs)
    const actual = await TodoAll.controller(req)
    const excepted = {
      statusCode: 200,
      data: docs
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 200 if using Title querystring', async () => {
    const query = { Title: 'title' }
    const req: any = { query }
    const docs = [{ foo: 'bar' }]
    findManyByQueryStub = sinon.stub(CommonQuery, 'findManyByQuery').returns(docs)
    const actual = await TodoAll.controller(req)
    const excepted = {
      statusCode: 200,
      data: docs
    }
    expect(actual).is.deep.equal(excepted)
  })
})
