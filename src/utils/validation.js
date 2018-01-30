export const required = name => v => (v ? undefined : `${name} is required.`)
export const number = name => v =>
  v === Number(v) ? undefined : `${name} must be a number.`
