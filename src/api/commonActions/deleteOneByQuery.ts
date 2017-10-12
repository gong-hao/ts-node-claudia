import { GetDb } from '../../conn';

export const DeleteOneByQuery = async<T>(conditions: any, collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).deleteOne(conditions);
};
