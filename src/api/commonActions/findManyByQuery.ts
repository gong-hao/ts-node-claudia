import { GetDb } from '../share/getDb';

export const FindManyByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).find(conditions).toArray();
};
