import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoRemove } from '.'
import { CommonQueryService } from '../../service/common-query.service'

describe('test TodoRemove.controller', () => {
  let deleteOneByIdStub

  afterEach(() => {
    deleteOneByIdStub.restore()
  })

  it('should return 204', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    deleteOneByIdStub = sinon.stub(CommonQueryService, 'deleteOneById').returns({ deletedCount: 1 })
    const actual = await TodoRemove.controller(req)
    const excepted = {
      statusCode: 204
    }
    expect(actual).deep.equals(excepted)
  })

  it('should return 404 if todo is not found', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const req: any = { params }
    deleteOneByIdStub = sinon.stub(CommonQueryService, 'deleteOneById').returns({ deletedCount: 0 })
    const actual = await TodoRemove.controller(req)
    const excepted = { statusCode: 404, message: 'todo not found' }
    expect(actual).deep.equals(excepted)
  })
})
