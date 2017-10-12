import { GetDb } from '../../conn';

export const UpdateManyByQuery = async<T>(conditions: any, data: any[], collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).updateMany(conditions, { $set: data });
};
