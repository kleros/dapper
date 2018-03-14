import React from 'react'
import PropTypes from 'prop-types'

import './text-input.css'

const TextInput = ({
  input: { value, onChange },
  meta: { touched, valid, error },
  placeholder,
  className
}) => (
  <div
    className={`TextInput ${
      error ? 'is-error' : valid ? 'is-valid' : ''
    } ${className}`}
  >
    <input
      className="TextInput-input"
      type="text"
      value={value}
      onChange={onChange}
    />
    {placeholder && (
      <div
        className={`TextInput-placeholder${
          touched || value ? ' is-touched' : ''
        }`}
      >
        {placeholder}
      </div>
    )}
    {error && <div className="TextInput-error">{error}</div>}
  </div>
)

TextInput.propTypes = {
  // Redux Form
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string
  }),

  // State
  placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,

  // Modifiers
  className: PropTypes.string
}

TextInput.defaultProps = {
  // Redux Form
  meta: {},

  // Modifiers
  className: ''
}

export default TextInput
