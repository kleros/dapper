import React from 'react'
import PropTypes from 'prop-types'

const Home = ({ str }) => <b>Hello World{str}</b>

Home.propTypes = {
  str: PropTypes.string
}

Home.defaultProps = {
  str: '!'
}

export default Home
