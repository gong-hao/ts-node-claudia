import { ObjectID } from 'mongodb';

import { ConvertObjectIDs } from './share/convert';
import { UpdateManyByQuery } from './updateManyByQuery';

export const UpdateManyByIds = async<T>(ids: string[] | ObjectID[], data: any[], collectionName: string) => {
  const conditions = {
    _id: { $in: ConvertObjectIDs(ids) }
  };
  return UpdateManyByQuery<T>(conditions, data, collectionName);
};
