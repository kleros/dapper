import { constantToCamelCase, camelToTitleCase } from './string'

const constant = 'HELLO_CRYPTO_WORLD'
const camelCase = 'helloCryptoWorld'
const capitalizeFirstCamelCase = 'HelloCryptoWorld'
const constantWith$ = '$HELLO$_WORLD'
const camelCaseWith$ = 'HELLOWorld'
const titleCase = 'Hello Crypto World'

describe('constantToCamelCase', () => {
  it('converts constant case strings to camel case.', () =>
    expect(constantToCamelCase(constant)).toBe(camelCase))
  it('converts constant case strings to camel case and capitalizes the first letter.', () =>
    expect(constantToCamelCase(constant, { capitalizeFirst: true })).toBe(
      capitalizeFirstCamelCase
    ))
  it('converts constant case strings to camel case and ignores chars between `$` chars.', () =>
    expect(constantToCamelCase(constantWith$)).toBe(camelCaseWith$))
})

describe('camelToTitleCase', () =>
  it('converts camel case strings to title case.', () =>
    expect(camelToTitleCase(camelCase)).toBe(titleCase)))
