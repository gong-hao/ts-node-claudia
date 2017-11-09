import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoList } from '.'
import { CommonQuery } from '../../service/common-query'

describe('test TodoList.controller.controller', () => {
  let findWithPagingStub

  afterEach(() => {
    findWithPagingStub.restore()
  })

  it('should return 200', async () => {
    const query = {}
    const req: any = { query }
    const result = { data: {}, metadata: {} }
    findWithPagingStub = sinon.stub(CommonQuery, 'findWithPaging').returns(result)
    const actual = await TodoList.controller(req)
    const excepted = {
      statusCode: 200,
      ...result
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 200 if using Title querystring', async () => {
    const query = { Title: 'title' }
    const req: any = { query }
    const result = { data: {}, metadata: {} }
    findWithPagingStub = sinon.stub(CommonQuery, 'findWithPaging').returns(result)
    const actual = await TodoList.controller(req)
    const excepted = {
      statusCode: 200,
      ...result
    }
    expect(actual).is.deep.equal(excepted)
  })
})
