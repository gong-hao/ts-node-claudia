import { ObjectID } from 'mongodb'

export interface Todo {
  _id: ObjectID
  Title?: string
  IsDone?: boolean
  DoneOn?: Date
}
