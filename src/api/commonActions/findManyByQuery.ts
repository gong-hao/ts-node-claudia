import { GetDb } from '../base/getDb';

export const FindManyByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).find(conditions).toArray();
};
