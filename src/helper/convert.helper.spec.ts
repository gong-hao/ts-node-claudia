import 'mocha'

import { expect } from 'chai'
import { ObjectID } from 'mongodb'

import { ConvertHelper } from './convert.helper'

describe('test ConvertHelper.toObjectID', () => {
  it('should return an ObjectID when using string param', () => {
    const actual = ConvertHelper.toObjectID('5879e5544cfcc9000130c608')
    expect(actual).is.an.instanceOf(ObjectID)
  })

  it('should return an ObjectID when using ObjectID param', () => {
    const actual = ConvertHelper.toObjectID(new ObjectID('5879e5544cfcc9000130c608'))
    expect(actual).is.an.instanceOf(ObjectID)
  })
})

describe('test ConvertHelper.toObjectIDs', () => {
  it('should return an ObjectID[] when using string[] param', () => {
    const actual = ConvertHelper.toObjectIDs(['5879e5544cfcc9000130c608', '587b3184d46655000136af90'])
    expect(actual).is.an.instanceOf(Array)
    const areAllObjectIDs = actual.every(x => x instanceof ObjectID)
    expect(areAllObjectIDs).is.true
  })

  it('should return an ObjectID[] when using ObjectID[] param', () => {
    const actual = ConvertHelper.toObjectIDs([new ObjectID('5879e5544cfcc9000130c608'), new ObjectID('5879e5544cfcc9000130c608')])
    expect(actual).is.an.instanceOf(Array)
    const areAllObjectIDs = actual.every(x => x instanceof ObjectID)
    expect(areAllObjectIDs).is.true
  })
})
