import 'mocha'

import { expect } from 'chai'
import { MongoClient } from 'mongodb'
import * as sinon from 'sinon'

import { DbClient } from './db-client'

describe('test DbClient.getDb', () => {
  it('should return new connected db', async () => {
    const db = { name: 'new db' }
    const mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await DbClient.getDb()
    mongoClientStub.restore()
    DbClient._db = null
    expect(actual).is.deep.equals(db)
  })

  it('should return the same db', async () => {
    const db = { name: 'same db' }
    DbClient._db = db
    const actual = await DbClient.getDb()
    expect(actual).is.deep.equals(db)
  })
})
