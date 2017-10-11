import { GetDb } from '../../conn';

export const FindAll = async<T>(conditions: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName)
    .find(conditions)
    .toArray();
};
