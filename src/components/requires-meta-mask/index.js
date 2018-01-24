import React from 'react'
import PropTypes from 'prop-types'
import './require-meta-mask.css'

const RequiresMetaMask = ({ needsUnlock }) => (
  <div className="RequiresMetaMask">
    <div className="RequiresMetaMask-message">
      <span>
        This is a decentralized application. In order to use this site please{' '}
      </span>
      {needsUnlock ? 'unlock ' : 'download '}
      <a
        className="RequiresMetaMask-message-link"
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
      >
        MetaMask
      </a>
    </div>
  </div>
)

RequiresMetaMask.propTypes = {
  needsUnlock: PropTypes.bool
}

RequiresMetaMask.defaultProps = {
  needsUnlock: false
}

export default RequiresMetaMask
