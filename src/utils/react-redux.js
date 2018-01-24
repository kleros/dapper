import PropTypes from 'prop-types'

/**
 * Creates a prop-types shape with common loading/error props.
 * @export
 * @param {any} shape - The shape to use for the data prop.
 * @param {object} { withCreate = false } = {} - Options object.
 * @returns {any} - a prop-types shape.
 */
export function createShape(shape, { withCreate = false } = {}) {
  return PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: shape,
    failedLoading: PropTypes.bool.isRequired,
    ...(withCreate
      ? {
          creating: PropTypes.bool.isRequired,
          failedCreating: PropTypes.bool.isRequired
        }
      : null)
  })
}

/**
 * Implements common rendering logic for loading and failures.
 * @export
 * @param {array} loadingValues - Array of booleans that indicate loading.
 * @param {array} values - Array of values.
 * @param {array} failedValues - Array of booleans that indicate failure.
 * @param {object} { loading, done, failed } - Renderables to render depending on conditions.
 * @returns {any} - A react renderable.
 */
export function renderIf(
  loadingValues,
  values,
  failedValues,
  { loading, done, failed }
) {
  if (failedValues.some(v => v)) return failed
  if (loadingValues.some(v => v)) return loading
  if (!values.every(v => v !== null && v !== undefined)) return failed

  return done
}
