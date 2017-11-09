import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoDetail } from '.'
import { CommonQuery } from '../../service/common-query'

describe('test TodoDetail.controller', () => {
  let findOneByIdStub

  afterEach(() => {
    findOneByIdStub.restore()
  })

  it('should return 200', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    const data = { foo: 'bar' }
    findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(data)
    const actual = await TodoDetail.controller(req)
    const excepted = {
      statusCode: 200,
      data: data
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 404 if todo is not found', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    const data = { foo: 'bar' }
    findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(undefined)
    const actual = await TodoDetail.controller(req)
    const excepted = {
      statusCode: 404,
      message: 'todo not found'
    }
    expect(actual).is.deep.equal(excepted)
  })
})
