import { GetDb } from '../base/getDb';

export const UpdateOneByQuery = async<T>(conditions: any, data: any, collectionName: string) => {
  const db = await GetDb();
  const update = {
    $set: data
  };
  return db.collection<T>(collectionName).updateOne(conditions, update);
};
