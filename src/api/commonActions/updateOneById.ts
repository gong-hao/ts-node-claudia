import { ObjectID } from 'mongodb';

import { GetDb } from '../../conn';

export const UpdateOneById = async<T>(id: string, data: any, collectionName: string) => {
  const db = await GetDb();
  const conditions = {
    _id: new ObjectID(id)
  };
  const update = {
    $set: data
  };
  return db.collection<T>(collectionName)
    .updateOne(conditions, update);
};
