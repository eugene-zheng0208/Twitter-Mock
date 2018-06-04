import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from './../../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from './../../redux/modules/users'
const { object, string, func, bool } = PropTypes

class AuthenticateContainer extends Component {
  handleAuth = (e) => {
    const { fetchAndHandleAuthedUser, history } = this.props
    e.preventDefault()
    fetchAndHandleAuthedUser()
      .then(() => history.replace('/feed'))
  }

  render () {
    const { isFetching, error } = this.props

    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={isFetching}
        error={error} />
    )
  }
}

AuthenticateContainer.propTypes = {
  fetchAndHandleAuthedUser: func.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
  history: object.isRequired,
}

export default connect(
  ({users}) => ({isFetching: users.isFetching, error: users.error}),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(AuthenticateContainer)
