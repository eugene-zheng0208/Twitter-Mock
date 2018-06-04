import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { DuckDetails } from '../../components'
import * as duckActionCreators from '../../redux/modules/ducks'
import * as likeCountActionCreators from '../../redux/modules/likeCount'
import * as repliesActionCreators from '../../redux/modules/replies'
const { func, object, string, bool } = PropTypes

class DuckDetailsContainer extends Component {
  componentDidMount() {
    const { initLikeFetch, duckId, duckAlreadyFetched, fetchAndHandleDuck, removeFetching } = this.props
    initLikeFetch(duckId)
    duckAlreadyFetched ? removeFetching() : fetchAndHandleDuck(duckId)
  }

  render() {
    const { authedUser, duckId, error, isFetching, addAndHandleReply } = this.props
    return (
      <DuckDetails
        authedUser={authedUser}
        duckId={duckId}
        error={error}
        isFetching={isFetching}
        addAndHandleReply={addAndHandleReply}/>
    )
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: object.isRequired,
  duckId: string.isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  removeFetching: func.isRequired,
  fetchAndHandleDuck: func.isRequired,
  duckAlreadyFetched: bool.isRequired,
  initLikeFetch: func.isRequired,
  addAndHandleReply: func.isRequired,
}

const mapStateToProps = ({ ducks, likeCount, users }, props) => {
  const duckId = props.match.params.duckId
  return {
    isFetching: ducks.get('isFetching') || likeCount.isFetching,
    error: ducks.get('error'),
    authedUser: users[users.authedId].info,
    duckId,
    duckAlreadyFetched: !!ducks.get(duckId),
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators,
  }, dispatch)
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DuckDetailsContainer)
