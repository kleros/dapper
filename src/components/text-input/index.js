import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({
  placeholder,
  input: { value, onChange },
  meta: { valid, touched, error },
  ...rest
}) => (
  <div className="TextInput" {...rest}>
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
    {/* T O D O: Display meta data */}
    {console.log(valid, touched, error)}
  </div>
)

TextInput.propTypes = {
  // State
  placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,

  // Redux Form
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
  }).isRequired,
  meta: PropTypes.shape({
    valid: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.string
  }).isRequired
}

export default TextInput
