import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer, RepliesContainer } from '../../containers'
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css'
import { subHeader, darkBtn, errorMsg } from '../../sharedStyles/styles.css'
import { formatReply } from '../../helpers/utils'
const { object, string, bool, func } = PropTypes

const Reply = ({ submit }) => {
  const handleSubmit = () => {
    if (Reply.ref.value.length === 0) return
    submit(Reply.ref.value)
    Reply.ref.value = ''
  }

  return (
    <div className={replyTextAreaContainer}>
      <textarea
        className={replyTextArea}
        ref={ref => Reply.ref = ref}
        maxLength={140}
        type='text'
        placeholder='Your response'/>
      <button
        onClick={handleSubmit}
        className={darkBtn}>
          Submit
      </button>
    </div>
  )
}

Reply.propTypes = {
  submit: func.isRequired,
}

const DuckDetails = ({ authedUser, duckId, isFetching, error, addAndHandleReply }) => {
  return (
    <div className={mainContainer}>
      {
        isFetching
          ? <p className={subHeader}>Fetching</p>
          : (
            <div className={container}>
              <div className={content}>
                <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn={true}/>
                <Reply submit={replyText => addAndHandleReply(duckId, formatReply(authedUser, replyText))}/>
              </div>
              <div className={repliesContainer}>
                <RepliesContainer duckId={duckId}/>
              </div>
            </div>
          )
      }
      {error && <p className={errorMsg}>{error}</p>}
    </div>
  )
}

DuckDetails.propTypes = {
  authedUser: object.isRequired,
  duckId: string.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
  addAndHandleReply: func.isRequired,
}

export default DuckDetails
