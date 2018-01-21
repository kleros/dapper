import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

const Button = ({ children, onClick, className }) => (
  <div className={`Button ${className}`} onClick={onClick}>
    <h4 className="Button-label">{children}</h4>
  </div>
)

Button.propTypes = {
  // State
  children: PropTypes.string.isRequired,

  // Handlers
  onClick: PropTypes.func.isRequired,

  // Modifiers
  className: PropTypes.string
}

Button.defaultProps = {
  // Modifiers
  className: ''
}

export default Button
