import { ObjectID } from 'mongodb';

import { GetDb } from '../../conn';

export const UpdateManyByIds = async<T>(ids: string[], data: any[], collectionName: string) => {
  const db = await GetDb();
  const _ids = ids.map(x => new ObjectID(x));
  const conditions = {
    _id: { $in: _ids }
  };
  return db.collection(collectionName)
    .updateMany(conditions, { $set: data });
};
