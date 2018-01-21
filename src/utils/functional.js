/**
 * @export
 * @param {object} obj - The obj to map over.
 * @param {object} func - The function to call with (value, key).
 * @returns {array} - An array with the results of calling func on every property of obj.
 */
// eslint-disable-next-line import/prefer-default-export, require-jsdoc
export function objMap(obj, func) {
  const keys = Object.keys(obj)
  const keysLen = keys.length
  const result = []

  for (let i = 0; i < keysLen; i++) {
    result.push(func(obj[keys[i]], keys[i]))
  }

  return result
}
