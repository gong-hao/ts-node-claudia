import 'mocha'

import { expect } from 'chai'
import { MongoClient, ObjectID } from 'mongodb'
import * as sinon from 'sinon'

import { CommonQueryService } from './common-query.service'
import { DbClientService } from './db-client.service'

describe('test DbClient.getDb', () => {
  let mongoClientStub

  afterEach(() => {
    mongoClientStub.restore()
    DbClientService._db = null
  })

  it('should insertOne', async () => {
    const db = {
      collection: (collectionName) => ({
        insertOne: () => Promise.resolve({ insertedCount: 1 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.insertOne({}, 'collectionName')
    expect(actual.insertedCount).deep.equals(1)
  })

  it('should insertMany', async () => {
    const db = {
      collection: (collectionName) => ({
        insertMany: () => Promise.resolve({ insertedCount: 2 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.insertMany([{}, {}], 'collectionName')
    expect(actual.insertedCount).deep.equals(2)
  })

  it('should updateOneById', async () => {
    const db = {
      collection: (collectionName) => ({
        updateOne: () => Promise.resolve({ modifiedCount: 1 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.updateOneById(new ObjectID(), {}, 'collectionName')
    expect(actual.modifiedCount).deep.equals(1)
  })

  it('should updateOneByQuery', async () => {
    const db = {
      collection: (collectionName) => ({
        updateOne: () => Promise.resolve({ modifiedCount: 1 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.updateOneByQuery({}, {}, 'collectionName')
    expect(actual.modifiedCount).deep.equals(1)
  })

  it('should updateManyByIds', async () => {
    const db = {
      collection: (collectionName) => ({
        updateMany: () => Promise.resolve({ modifiedCount: 2 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.updateManyByIds([new ObjectID(), new ObjectID()], {}, 'collectionName')
    expect(actual.modifiedCount).deep.equals(2)
  })

  it('should updateManyByQuery', async () => {
    const db = {
      collection: (collectionName) => ({
        updateMany: () => Promise.resolve({ modifiedCount: 2 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.updateManyByQuery({}, {}, 'collectionName')
    expect(actual.modifiedCount).deep.equals(2)
  })

  it('should deleteOneById', async () => {
    const db = {
      collection: (collectionName) => ({
        deleteOne: () => Promise.resolve({ deletedCount: 1 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.deleteOneById(new ObjectID(), 'collectionName')
    expect(actual.deletedCount).deep.equals(1)
  })

  it('should deleteOneByQuery', async () => {
    const db = {
      collection: (collectionName) => ({
        deleteOne: () => Promise.resolve({ deletedCount: 1 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.deleteOneByQuery({}, 'collectionName')
    expect(actual.deletedCount).deep.equals(1)
  })

  it('should deleteManyByIds', async () => {
    const db = {
      collection: (collectionName) => ({
        deleteMany: () => Promise.resolve({ deletedCount: 2 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.deleteManyByIds([new ObjectID(), new ObjectID()], 'collectionName')
    expect(actual.deletedCount).deep.equals(2)
  })

  it('should deleteManyByQuery', async () => {
    const db = {
      collection: (collectionName) => ({
        deleteMany: () => Promise.resolve({ deletedCount: 2 })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.deleteManyByQuery({}, 'collectionName')
    expect(actual.deletedCount).deep.equals(2)
  })

  it('should findOneById', async () => {
    const data = { name: 'foo' }
    const db = {
      collection: (collectionName) => ({
        findOne: () => Promise.resolve(data)
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.findOneById(new ObjectID(), 'collectionName')
    expect(actual).deep.equals(data)
  })

  it('should findOneByQuery', async () => {
    const data = { name: 'foo' }
    const db = {
      collection: (collectionName) => ({
        findOne: () => Promise.resolve(data)
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.findOneByQuery({}, 'collectionName')
    expect(actual).deep.equals(data)
  })

  it('should findManyByIds', async () => {
    const data = [{ name: 'foo' }, { name: 'bar' }]
    const db = {
      collection: (collectionName) => ({
        find: () => ({
          toArray: () => Promise.resolve(data)
        })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.findManyByIds([new ObjectID(), new ObjectID()], 'collectionName')
    expect(actual).deep.equals(data)
  })

  it('should findManyByQuery', async () => {
    const data = [{ name: 'foo' }, { name: 'bar' }]
    const db = {
      collection: (collectionName) => ({
        find: () => ({
          toArray: () => Promise.resolve(data)
        })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.findManyByQuery({}, 'collectionName')
    expect(actual).deep.equals(data)
  })

  it('should findWithPaging', async () => {
    const data = [
      { sort: 6, name: 'foo' },
      { sort: 7, name: 'bar' },
      { sort: 8, name: 'woo' },
      { sort: 9, name: 'meow' },
      { sort: 10, name: 'woof' }
    ]
    const url = '/test?Page=2&Limit=2&Sort=-sort'
    const pagingObj = {
      Page: 2,
      Limit: 5,
      Sort: 'sort'
    }
    const db = {
      collection: (collectionName) => ({
        find: () => ({
          count: () => Promise.resolve(13),
          sort: () => ({
            skip: () => ({
              limit: () => ({
                toArray: () => Promise.resolve(data)
              })
            })
          })
        })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.findWithPaging({}, 'collectionName', url, pagingObj)
    const excepted = {
      data: data,
      metadata: {
        count: 13,
        page: 2,
        last: 3,
        limit: 5,
        sort: { sort: 1 },
        links:
          {
            first: '/test?Page=1&Limit=2&Sort=-sort',
            previous: '/test?Page=1&Limit=2&Sort=-sort',
            current: '/test?Page=2&Limit=2&Sort=-sort',
            next: '/test?Page=3&Limit=2&Sort=-sort',
            last: '/test?Page=3&Limit=2&Sort=-sort'
          }
      }
    }
    expect(actual).deep.equals(excepted)
  })

  it('should findWithPaging set defaultSortObj', async () => {
    const data = [
      { sort: 6, name: 'foo' },
      { sort: 7, name: 'bar' },
      { sort: 8, name: 'woo' },
      { sort: 9, name: 'meow' },
      { sort: 10, name: 'woof' }
    ]
    const url = '/test?Page=2&Limit=2&Sort=-sort'
    const pagingObj = {
      Page: 2,
      Limit: 5,
      Sort: 'sort'
    }
    const defaultSortObj = {
      name: 1
    }
    const db = {
      collection: (collectionName) => ({
        find: () => ({
          count: () => Promise.resolve(13),
          sort: () => ({
            skip: () => ({
              limit: () => ({
                toArray: () => Promise.resolve(data)
              })
            })
          })
        })
      })
    }
    mongoClientStub = sinon.stub(MongoClient, 'connect').resolves(db)
    const actual = await CommonQueryService.findWithPaging({}, 'collectionName', url, pagingObj, defaultSortObj)
    const excepted = {
      data: data,
      metadata: {
        count: 13,
        page: 2,
        last: 3,
        limit: 5,
        sort: { sort: 1 },
        links:
          {
            first: '/test?Page=1&Limit=2&Sort=-sort',
            previous: '/test?Page=1&Limit=2&Sort=-sort',
            current: '/test?Page=2&Limit=2&Sort=-sort',
            next: '/test?Page=3&Limit=2&Sort=-sort',
            last: '/test?Page=3&Limit=2&Sort=-sort'
          }
      }
    }
    expect(actual).deep.equals(excepted)
  })
})
