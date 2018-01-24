import PropTypes from 'prop-types'

import { createShape, renderIf } from './react-redux'

jest.mock('prop-types', () => ({
  shape: s => s,
  bool: { isRequired: 'bool', toString: () => 'bool' },
  string: { isRequired: 'string', toString: () => 'string' }
}))

describe('createShape', () => {
  const shape = PropTypes.shape({ value: PropTypes.string.isRequired })
  const createdShape = PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: shape,
    failedLoading: PropTypes.bool.isRequired
  })
  const createdShapeWithCreate = PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: shape,
    failedLoading: PropTypes.bool.isRequired,
    creating: PropTypes.bool.isRequired,
    failedCreating: PropTypes.bool.isRequired
  })

  it('creates a remote resource shape with loading and failedLoading props.', () =>
    expect(createShape(shape)).toEqual(createdShape))
  it('creates a remote resource shape with loading, failedLoading, creating, and failedCreating props.', () =>
    expect(createShape(shape, { withCreate: true })).toEqual(
      createdShapeWithCreate
    ))
})

describe('renderIf', () => {
  const value = 'value'
  const render = {
    loading: 'loading',
    done: 'done',
    failed: 'failed'
  }

  it('renders failed if any of the fail values is truthy.', () => {
    expect(renderIf([false], [value], [true], render)).toBe(render.failed)
    expect(renderIf([false], [value], [false, true, false], render)).toBe(
      render.failed
    )
  })
  it('renders loading if all the failed values are falsy and any of the loading values is truthy.', () => {
    expect(renderIf([true, false], [value], [true], render)).toBe(render.failed)
    expect(renderIf([true, false], [value], [false], render)).toBe(
      render.loading
    )
  })
  it('renders failed if all loading values are falsy and all values are null or undefined.', () => {
    expect(renderIf([false], [null, undefined], [false], render)).toBe(
      render.failed
    )
  })
  it('renders done if all loading values are falsy, no values are null or undefined, and all the failed values are falsy.', () => {
    expect(renderIf([false], [value], [false], render)).toBe(render.done)
  })
})
