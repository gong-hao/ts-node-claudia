import 'mocha'

import { expect } from 'chai'
import { ObjectID } from 'mongodb'

import { Convert } from './convert'

describe('test Convert.toObjectID', () => {
  it('should return an ObjectID when using string param', () => {
    const actual = Convert.toObjectID('5879e5544cfcc9000130c608')
    expect(actual).instanceOf(ObjectID)
  })

  it('should return an ObjectID when using ObjectID param', () => {
    const actual = Convert.toObjectID(new ObjectID('5879e5544cfcc9000130c608'))
    expect(actual).instanceOf(ObjectID)
  })
})

describe('test Convert.toObjectIDs', () => {
  it('should return an ObjectID[] when using string[] param', () => {
    const actual = Convert.toObjectIDs(['5879e5544cfcc9000130c608', '587b3184d46655000136af90'])
    expect(actual).instanceOf(Array)
    const areAllObjectIDs = actual.every(x => x instanceof ObjectID)
    expect(areAllObjectIDs).is.true
  })

  it('should return an ObjectID[] when using ObjectID[] param', () => {
    const actual = Convert.toObjectIDs([new ObjectID('5879e5544cfcc9000130c608'), new ObjectID('5879e5544cfcc9000130c608')])
    expect(actual).instanceOf(Array)
    const areAllObjectIDs = actual.every(x => x instanceof ObjectID)
    expect(areAllObjectIDs).is.true
  })
})
