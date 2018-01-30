import { constantToCamelCase, camelToTitleCase } from './string'

const constant = 'HELLO_CRYPTO_WORLD'
const camelCase = 'helloCryptoWorld'
const capitalizeFirst = 'HelloCryptoWorld'
const titleCase = 'Hello Crypto World'

describe('constantToCamelCase', () => {
  it('converts constant case strings to camel case.', () =>
    expect(constantToCamelCase(constant)).toBe(camelCase))
  it('converts constant case strings to camel case and capitalizes the first letter.', () =>
    expect(constantToCamelCase(constant, { capitalizeFirst: true })).toBe(
      capitalizeFirst
    ))
})

describe('camelToTitleCase', () =>
  it('converts camel case strings to title case.', () =>
    expect(camelToTitleCase(camelCase)).toBe(titleCase)))
