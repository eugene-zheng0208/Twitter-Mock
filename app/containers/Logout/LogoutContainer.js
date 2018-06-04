import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { logoutAndUnauth } from './../../redux/modules/users'
import { Logout } from './../../components'
const { func } = PropTypes

class LogoutContainer extends Component {
  componentDidMount () {
    this.props.dispatch(logoutAndUnauth())
  }

  render () {
    return (
      <Logout />
    )
  }
}

LogoutContainer.propTypes = {
  dispatch: func.isRequired,
}

export default connect()(LogoutContainer)
