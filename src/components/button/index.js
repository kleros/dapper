import React from 'react'
import PropTypes from 'prop-types'

import './button.css'

const Button = ({
  children,
  onClick,
  disabled,
  className,
  labelClassName,
  ...rest
}) => (
  <div
    className={`Button ${disabled ? 'is-disabled' : ''} ${className}`}
    onClick={onClick}
    {...rest}
  >
    <h5 className={`Button-label ${labelClassName}`}>{children}</h5>
  </div>
)

Button.propTypes = {
  // State
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,

  // Handlers
  onClick: PropTypes.func.isRequired,

  // Modifiers
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string
}

Button.defaultProps = {
  // Modifiers
  disabled: false,
  className: '',
  labelClassName: ''
}

export default Button
