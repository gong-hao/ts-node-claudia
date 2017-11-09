import { Db, MongoClient } from 'mongodb'

const getDb = async (): Promise<Db> => {
  if (DbClient._db) {
    return DbClient._db
  }
  DbClient._db = await MongoClient.connect(process.env.conn)
  return DbClient._db
}

export const DbClient = {
  _db: null,
  getDb
}
