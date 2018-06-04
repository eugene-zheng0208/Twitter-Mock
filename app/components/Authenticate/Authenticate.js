import React from 'react'
import PropTypes from 'prop-types'
import { centeredContainer, largeHeader, errorMsg } from './../../sharedStyles/styles.css'
import { FacebookAuthButton } from './../../components'
const { string, func, bool } = PropTypes

const Authenticate = ({ onAuth, isFetching, error }) => (
  <div className={centeredContainer}>
    <h1 className={largeHeader}>Authenticate</h1>
    <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
    {error && <p className={errorMsg}>{error}</p>}
  </div>
)

Authenticate.propTypes = {
  error: string.isRequired,
  isFetching: bool.isRequired,
  onAuth: func.isRequired,
}

export default Authenticate
