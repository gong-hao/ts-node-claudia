import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoToggle } from '.'
import { CommonQueryService } from '../../service/common-query.service'

describe('test TodoToggle.controller', () => {
  let findOneByIdStub
  let updateOneByIdStub

  afterEach(() => {
    findOneByIdStub.restore()
    updateOneByIdStub.restore()
  })

  it('should return 200', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    const data = { foo: 'bar' }
    findOneByIdStub = sinon.stub(CommonQueryService, 'findOneById').returns(data)
    updateOneByIdStub = sinon.stub(CommonQueryService, 'updateOneById').returns({})
    const actual = await TodoToggle.controller(req)
    const excepted = {
      statusCode: 200
    }
    expect(actual).deep.equals(excepted)
  })

  it('should return 200 if using IsDone prop in body', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    const data = { foo: 'bar', IsDone: true }
    findOneByIdStub = sinon.stub(CommonQueryService, 'findOneById').returns(data)
    updateOneByIdStub = sinon.stub(CommonQueryService, 'updateOneById').returns({})
    const actual = await TodoToggle.controller(req)
    const excepted = {
      statusCode: 200
    }
    expect(actual).deep.equals(excepted)
  })

  it('should return 404 if todo is not found', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    findOneByIdStub = sinon.stub(CommonQueryService, 'findOneById').returns(undefined)
    updateOneByIdStub = sinon.stub(CommonQueryService, 'updateOneById').returns({})
    const actual = await TodoToggle.controller(req)
    const excepted = { statusCode: 404, message: 'todo not found' }
    expect(actual).deep.equals(excepted)
  })
})
