import 'mocha'

import { expect } from 'chai'
import { MongoClient } from 'mongodb'
import * as sinon from 'sinon'

import { DbClientService } from './db-client.service'

describe('test DbClientService.getDb', () => {
  it('should return new connected db', async () => {
    const db = { name: 'new db' }
    const mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await DbClientService.getDb()
    mongoClientStub.restore()
    DbClientService._db = null
    expect(actual).deep.equals(db)
  })

  it('should return the same db', async () => {
    const db = { name: 'same db' }
    DbClientService._db = db
    const actual = await DbClientService.getDb()
    expect(actual).deep.equals(db)
  })
})
