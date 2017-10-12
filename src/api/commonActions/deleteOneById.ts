import { ObjectID } from 'mongodb';

import { DeleteOneByQuery } from './deleteOneByQuery';
import { ConvertObjectID } from './share/convert';

export const DeleteOneById = async<T>(id: string | ObjectID, collectionName: string) => {
  const conditions = {
    _id: ConvertObjectID(id)
  };
  return DeleteOneByQuery(conditions, collectionName);
};
