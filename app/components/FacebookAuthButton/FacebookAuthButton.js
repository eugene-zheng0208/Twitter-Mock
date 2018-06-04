import React from 'react'
import PropTypes from 'prop-types'
import { button } from './styles.css'
const { func, bool } = PropTypes

const FacebookAuthButton = ({ onAuth, isFetching }) => (
  <button onClick={onAuth} className={button} >
    {isFetching
      ? 'Loading'
      : 'Login with facebook'}
  </button>
)

FacebookAuthButton.propTypes = {
  onAuth: func.isRequired,
  isFetching: bool.isRequired,
}

export default FacebookAuthButton
