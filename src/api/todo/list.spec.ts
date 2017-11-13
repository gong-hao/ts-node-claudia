import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoList } from '.'
import { CommonQueryService } from '../../service/common-query.service'

describe('test TodoList.controller.controller', () => {
  let findWithPagingStub

  afterEach(() => {
    findWithPagingStub.restore()
  })

  it('should return 200', async () => {
    const query = {}
    const req: any = { query }
    const result = { data: {}, metadata: {} }
    findWithPagingStub = sinon.stub(CommonQueryService, 'findWithPaging').returns(result)
    const actual = await TodoList.controller(req)
    const excepted = {
      statusCode: 200,
      ...result
    }
    expect(actual).deep.equals(excepted)
  })

  it('should return 200 if using Title querystring', async () => {
    const query = { Title: 'title' }
    const req: any = { query }
    const result = { data: {}, metadata: {} }
    findWithPagingStub = sinon.stub(CommonQueryService, 'findWithPaging').returns(result)
    const actual = await TodoList.controller(req)
    const excepted = {
      statusCode: 200,
      ...result
    }
    expect(actual).deep.equals(excepted)
  })
})
