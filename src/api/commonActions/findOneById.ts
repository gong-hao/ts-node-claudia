import { ObjectId } from 'mongodb';

import { GetDb } from '../../conn';

export const FindOneById = async<T>(id: string, collectionName: string) => {
  const db = await GetDb();
  const conditions = {
    _id: new ObjectId(id)
  };
  return db.collection<T>(collectionName)
    .findOne(conditions);
};
