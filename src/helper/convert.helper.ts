import { ObjectID } from 'mongodb'

const toObjectID = (id: string | ObjectID): ObjectID => {
  if (id instanceof ObjectID) {
    return id
  }
  return new ObjectID(id)
}

const toObjectIDs = (ids: string[] | ObjectID[]): ObjectID[] => {
  const _ids: any[] = ids
  return _ids.map(id => toObjectID(id))
}

export const ConvertHelper = {
  toObjectID,
  toObjectIDs
}
