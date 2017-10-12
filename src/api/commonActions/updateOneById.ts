import { ObjectID } from 'mongodb';

import { ConvertObjectID } from './share/convert';
import { UpdateOneByQuery } from './updateOneByQuery';

export const UpdateOneById = async<T>(id: string | ObjectID, data: any, collectionName: string) => {
  const conditions = {
    _id: ConvertObjectID(id)
  };
  return UpdateOneByQuery(conditions, data, collectionName);
};
