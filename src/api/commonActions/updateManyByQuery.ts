import { GetDb } from '../base/getDb';

export const UpdateManyByQuery = async<T>(conditions: any, data: any[], collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).updateMany(conditions, { $set: data });
};
