import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoToggle } from '.'
import { CommonQuery } from '../../service/common-query'

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
    findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(data)
    updateOneByIdStub = sinon.stub(CommonQuery, 'updateOneById').returns({})
    const actual = await TodoToggle.controller(req)
    const excepted = {
      statusCode: 200
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 200 if using IsDone prop in body', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    const data = { foo: 'bar', IsDone: true }
    findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(data)
    updateOneByIdStub = sinon.stub(CommonQuery, 'updateOneById').returns({})
    const actual = await TodoToggle.controller(req)
    const excepted = {
      statusCode: 200
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 404 if todo is not found', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    findOneByIdStub = sinon.stub(CommonQuery, 'findOneById').returns(undefined)
    updateOneByIdStub = sinon.stub(CommonQuery, 'updateOneById').returns({})
    const actual = await TodoToggle.controller(req)
    const excepted = { statusCode: 404, message: 'todo not found' }
    expect(actual).is.deep.equal(excepted)
  })
})
