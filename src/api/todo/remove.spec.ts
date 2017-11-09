import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoRemove } from '.'
import { CommonQuery } from '../../service/common-query'

describe('test TodoRemove.controller', () => {
  let deleteOneByIdStub

  afterEach(() => {
    deleteOneByIdStub.restore()
  })

  it('should return 204', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    deleteOneByIdStub = sinon.stub(CommonQuery, 'deleteOneById').returns({ deletedCount: 1 })
    const actual = await TodoRemove.controller(req)
    const excepted = {
      statusCode: 204
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 404 if todo is not found', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    deleteOneByIdStub = sinon.stub(CommonQuery, 'deleteOneById').returns({ deletedCount: 0 })
    const actual = await TodoRemove.controller(req)
    const excepted = { statusCode: 404, message: 'todo not found' }
    expect(actual).is.deep.equal(excepted)
  })
})
