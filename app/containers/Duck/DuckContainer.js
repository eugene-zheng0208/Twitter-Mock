import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { Duck } from '../../components'
import * as usersLikesAction from '../../redux/modules/usersLikes'
const { func, object, bool, number } = PropTypes

class DuckContainer extends Component {
  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true,
  }

  goToProfile = (e) => {
    e.stopPropagation()
    this.context.router.history.push(`/${this.props.duck.get('uid')}`)
  }

  handleClick = (e) => {
    e.preventDefault()
    this.context.router.history.push(`/duckDetail/${this.props.duck.get('duckId')}`)
  }

  render() {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props} />
    )
  }
}

DuckContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

DuckContainer.propTypes = {
  duck: object.isRequired,
  handleClick: func,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  isLiked: bool.isRequired,
  numberOfLikes: number,
  addAndHandleLike: func.isRequired,
  handleDeleteLike: func.isRequired,
}

const mapStateToProps = ({ ducks, likeCount, usersLikes }, props) => (
  {
    duck: ducks.get(props.duckId),
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  }
)

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(usersLikesAction, dispatch)
)(DuckContainer)
