import { objMap } from './functional'

describe('objMap', () => {
  const obj = { a: 1, b: 2, c: 3 }
  const add1 = value => value + 1

  const add1Arr = [2, 3, 4]
  const add1Obj = { a: 2, b: 3, c: 4 }
  const transformKeyadd1Obj = { a1: 2, b2: 3, c3: 4 }

  it('maps objects into arrays.', () =>
    expect(objMap(obj, add1)).toEqual(add1Arr))

  it('maps objects into objects.', () =>
    expect(objMap(obj, add1, { returnObj: true })).toEqual(add1Obj))

  it('maps objects into objects and transforms their keys.', () =>
    expect(
      objMap(obj, add1, {
        returnObj: true,
        transformKeyFunc: (value, key) => key + value
      })
    ).toEqual(transformKeyadd1Obj))
})
