import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { User } from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { staleDucks, stableUser } from '../../helpers/utils'
import * as usersActionCreators from '../../redux/modules/users'
import * as usersDucksActionCreators from '../../redux/modules/usersDucks'
const { func, string, bool, array, number, object } = PropTypes

class UserContainer extends Component {
  componentDidMount() {
    const { match, noUser, lastUpdatedUser, lastUpdatedDucks, fetchAndHandleUser, fetchAndHandleUsersDucks } = this.props
    const uid = match.params.uid

    if (noUser || stableUser(lastUpdatedUser)) {
      fetchAndHandleUser(uid)
    }
    if (noUser || staleDucks(lastUpdatedDucks)) {
      fetchAndHandleUsersDucks(uid)
    }
  }

  render() {
    const { noUser, isFetching, name, error, duckIds } = this.props

    return (
      <User
        noUser={noUser}
        isFetching={isFetching}
        name={name}
        error={error}
        duckIds={duckIds}/>
    )
  }
}

UserContainer.propTypes = {
  name: string.isRequired,
  noUser: bool.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
  lastUpdatedUser: number.isRequired,
  lastUpdatedDucks: number.isRequired,
  duckIds: array.isRequired,
  fetchAndHandleUsersDucks: func.isRequired,
  fetchAndHandleUser: func.isRequired,
  match: object.isRequired,
}

const mapStateToProps = ({ users, usersDucks }, props) => {
  const uid = props.match.params.uid
  const specificUsersDucks = usersDucks[uid]
  const user = users[uid]
  const noUser = typeof user === 'undefined'
  const name = noUser ? '' : user.info.name
  return {
    noUser,
    name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedDucks: specificUsersDucks ? specificUsersDucks.lastUpdated : 0,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersDucksActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserContainer)
