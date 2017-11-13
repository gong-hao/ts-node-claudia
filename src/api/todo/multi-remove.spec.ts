import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoMultiRemove } from '.'
import { CommonQueryService } from '../../service/common-query.service'

describe('test TodoMultiRemove.controller', () => {
  let deleteManyByIdsStub

  afterEach(() => {
    deleteManyByIdsStub.restore()
  })

  it('should return 204', async () => {
    const body = { foo: 'bar' }
    const req: any = { body }
    deleteManyByIdsStub = sinon.stub(CommonQueryService, 'deleteManyByIds').returns({ deletedCount: 3 })
    const actual = await TodoMultiRemove.controller(req)
    const excepted = {
      statusCode: 204
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 404 if todo is not found', async () => {
    const body = { foo: 'bar' }
    const req: any = { body }
    deleteManyByIdsStub = sinon.stub(CommonQueryService, 'deleteManyByIds').returns({ deletedCount: 0 })
    const actual = await TodoMultiRemove.controller(req)
    const excepted = { statusCode: 404, message: 'todo not found' }
    expect(actual).is.deep.equal(excepted)
  })
})
