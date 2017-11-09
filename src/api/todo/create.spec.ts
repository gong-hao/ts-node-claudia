import 'mocha'

import { expect } from 'chai'
import * as sinon from 'sinon'

import { TodoCreate } from '.'
import { CommonQuery } from '../../service/common-query'

describe('test TodoCreate.controller', () => {
  let insertOneStub

  afterEach(() => {
    insertOneStub.restore()
  })

  it('should return 200', async () => {
    const body = { Title: 'something need to do' }
    const req: any = { body }
    insertOneStub = sinon.stub(CommonQuery, 'insertOne').returns({ insertedCount: 1, insertedId: 'insertedId' })
    const actual = await TodoCreate.controller(req)
    const excepted = {
      statusCode: 201,
      data: { insertedId: 'insertedId' }
    }
    expect(actual).is.deep.equal(excepted)
  })

  it('should return 500 if ', async () => {
    const body = { Title: 'something need to do' }
    const req: any = { body }
    insertOneStub = sinon.stub(CommonQuery, 'insertOne').returns({ insertedCount: 0 })
    const actual = await TodoCreate.controller(req)
    const excepted = { statusCode: 500, message: 'insert failed' }
    expect(actual).is.deep.equal(excepted)
  })
})
