/**
 * Converts a string in constant case to camel case. e.g. HELLO_WORLD => helloWorld. It also ignores characters between $ chars. e.g. $HELLO$_WORLD => HELLOWorld.
 * @param {string} str - The string to convert.
 * @param {{ capitalizeFirst: boolean }} [options={ capitalizeFirst: false }] - An options object with sensible defaults.
 * @returns {string} - The converted string.
 */
export function constantToCamelCase(str, { capitalizeFirst = false } = {}) {
  const newStr = str
    .toLowerCase()
    .replace(/_./g, match => match[1].toUpperCase())

  return (capitalizeFirst
    ? newStr[0].toUpperCase() + newStr.slice(1)
    : newStr
  ).replace(/\$(.+?)\$/g, (_m, p1) => p1.toUpperCase())
}

/**
 * Converts a string in camel case to title case. e.g. helloWorld => Hello World.
 * @param {string} str - The string to convert.
 * @returns {string} - The converted string.
 */
export function camelToTitleCase(str) {
  return str.replace(
    /(^[a-z])|([a-z][A-Z])|([A-Z][a-z])/g,
    (_m, p1, p2, p3) =>
      p1 ? p1.toUpperCase() : p2 ? p2[0] + ' ' + p2[1] : ' ' + p3
  )
}
