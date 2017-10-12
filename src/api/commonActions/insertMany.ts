import { GetDb } from '../../conn';

export const InsertMany = async<T>(data: any[], collectionName: string) => {
  const db = await GetDb();
  return db.collection<T>(collectionName).insertMany(data, { w: 1 });
};
