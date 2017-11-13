import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoModify } from '.'
import { CommonQueryService } from '../../service/common-query.service'

describe('test TodoModify.controller', () => {
  let updateOneByIdStub

  afterEach(() => {
    updateOneByIdStub.restore()
  })

  it('should return 201', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const body = { Title: 'something need to do' }
    const req: any = { params, body }
    updateOneByIdStub = sinon.stub(CommonQueryService, 'updateOneById').returns({ modifiedCount: 1 })
    const actual = await TodoModify.controller(req)
    const excepted = {
      statusCode: 201
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 404 if todo is not found', async () => {
    const params = { ID: '59decd8976ed91e7b430e97e' }
    const body = { Title: 'something need to do' }
    const req: any = { params, body }
    updateOneByIdStub = sinon.stub(CommonQueryService, 'updateOneById').returns({ modifiedCount: 0 })
    const actual = await TodoModify.controller(req)
    const excepted = { statusCode: 404, message: 'todo not found' }
    expect(actual).is.deep.equal(excepted)
  })
})
