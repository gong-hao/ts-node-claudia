import { ObjectID } from 'mongodb';

import { GetDb } from '../../conn';

export const DeleteManyByIds = async<T>(ids: string[], collectionName: string) => {
  const db = await GetDb();
  return new Promise((resolve, reject) => {
    const _ids = ids.map(x => new ObjectID(x));
    const conditions = {
      _id: { $in: _ids }
    };
    return db.collection<T>(collectionName)
      .deleteMany(conditions);
  });
};
