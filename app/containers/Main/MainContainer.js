import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navigation } from './../../components'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from './../../redux/modules/users'
import * as usersLikesActionCreators from './../../redux/modules/usersLikes'
import { formatUserInfo } from './../../helpers/utils'
import { firebaseAuth } from './../../config/constants'
const { object, func, bool, any } = PropTypes

class MainContainer extends Component {
  componentDidMount () {
    const { authUser, removeFetchingUser, fetchingUserSuccess, location, history, setUsersLikes } = this.props

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        authUser(user.uid)
        setUsersLikes()
        fetchingUserSuccess(user.uid, userInfo)
        if (location.pathname === '/') {
          history.replace('/feed')
        }
      } else {
        removeFetchingUser()
      }
    })
  }

  render () {
    const { isAuthed, children, isFetching } = this.props

    return isFetching
      ? null
      : (
        <div className={container}>
          <Navigation isAuthed={isAuthed} />
          <div className={innerContainer}>
            {children}
          </div>
        </div>
      )
  }
}

MainContainer.propTypes = {
  children: any,
  isAuthed: bool.isRequired,
  authUser: func.isRequired,
  fetchingUserSuccess: func.isRequired,
  removeFetchingUser: func.isRequired,
  location: object.isRequired,
  history: object.isRequired,
  isFetching: bool.isRequired,
  setUsersLikes: func.isRequired,
}

export default withRouter(connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  dispatch => bindActionCreators({
    ...userActionCreators,
    ...usersLikesActionCreators,
  }, dispatch)
)(MainContainer))
