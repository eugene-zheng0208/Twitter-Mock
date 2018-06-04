import React from 'react'
import PropTypes from 'prop-types'
import { formatTimestamp } from '../../helpers/utils'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'
import {
  duckContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author,
} from './styles.css'
import { Map } from 'immutable'
const { instanceOf, func, bool, number } = PropTypes

const Duck = ({ isLiked, handleDeleteLike, addAndHandleLike, hideReplyBtn,
                onClick, duck, goToProfile, hideLikeCount, numberOfLikes }) => {
  const starIcon = isLiked === true ? likedIcon : icon
  const starFn = isLiked === true ? handleDeleteLike : addAndHandleLike

  return (
    <div
      className={duckContainer}
      style={{cursor: hideReplyBtn === true ? 'default' : 'pointer'}}
      onClick={onClick}>
        <img src={duck.get('avatar')} className={avatar}/>
        <div className={contentContainer}>
          <div className={header}>
            <div onClick={goToProfile} className={author}>{duck.get('name')}</div>
            <div>{formatTimestamp(duck.get('timestamp'))}</div>
          </div>
          <div className={text}>{duck.get('text')}</div>
          <div className={likeReplyContainer}>
            {
              hideReplyBtn === true
                ? null
                : <Reply className={icon}/>
            }
            <div className={actionContainer}>
              <Star className={starIcon} onClick={e => starFn(duck.get('duckId'), e)}/>
              {
                hideLikeCount === true
                  ? null
                  : <div>{numberOfLikes}</div>
              }
            </div>
          </div>
        </div>
    </div>
  )
}

Duck.propTypes = {
  duck: instanceOf(Map),
  onClick: func,
  isLiked: bool.isRequired,
  addAndHandleLike: func.isRequired,
  handleDeleteLike: func.isRequired,
  numberOfLikes: number,
  hideReplyBtn: bool.isRequired,
  hideLikeCount: bool.isRequired,
  goToProfile: func.isRequired,
}

export default Duck
