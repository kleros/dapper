import React from 'react'
import PropTypes from 'prop-types'

import Balance from '../balance'

const Home = ({ str }) => (
  <div>
    <b>Hello CryptoWorld{str}</b>
    <br />
    <br />
    <Balance />
  </div>
)

Home.propTypes = {
  str: PropTypes.string
}

Home.defaultProps = {
  str: '!'
}

export default Home
