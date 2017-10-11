import { ObjectID } from 'mongodb';

import { GetDb } from '../../conn';

export const DeleteOneById = async<T>(id: string, collectionName: string) => {
  const db = await GetDb();
  const conditions = {
    _id: new ObjectID(id)
  };
  return db.collection<T>(collectionName)
    .deleteOne(conditions);
};
