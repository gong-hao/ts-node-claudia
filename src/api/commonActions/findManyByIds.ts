import { ObjectID } from 'mongodb';

import { FindManyByQuery } from './findManyByQuery';
import { ConvertObjectIDs } from './share/convert';

export const FindManyByIds = async<T>(ids: string[] | ObjectID[], collectionName: string) => {
  const conditions = {
    _id: { $in: ConvertObjectIDs(ids) }
  };
  return FindManyByQuery<T>(conditions, collectionName);
};
