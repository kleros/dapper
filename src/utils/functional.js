/**
 * Maps object into an array or a new object and optionally transforms keys.
 * @param {object} obj - The obj to map over.
 * @param {function} func - The function to call with (value, key).
 * @param {{ returnObj: boolean, transformKeyFunc: function }} [options={ returnObj: false }] - Options object.
 * @returns {any[]|object} - An array or object, (with optionally transformed keys), with the results of calling func on every property of obj.
 */
export function objMap(
  obj,
  func,
  { returnObj = false, transformKeyFunc } = {}
) {
  const keys = Object.keys(obj)
  const keysLen = keys.length
  const result = returnObj ? {} : []

  for (let i = 0; i < keysLen; i++) {
    const res = func(obj[keys[i]], keys[i])
    if (returnObj)
      result[
        transformKeyFunc ? transformKeyFunc(obj[keys[i]], keys[i]) : keys[i]
      ] = res
    else result.push(res)
  }

  return result
}
