import { Db, MongoClient } from 'mongodb'

const getDb = async (): Promise<Db> => {
  if (DbClientService._db) {
    return DbClientService._db
  }
  DbClientService._db = await MongoClient.connect(process.env.conn)
  return DbClientService._db
}

export const DbClientService = {
  _db: null,
  getDb
}
