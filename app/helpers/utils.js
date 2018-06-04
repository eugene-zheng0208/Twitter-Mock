import { usersDucksExpirationLength, userExpirationLength, repliesExpirationLength } from '../config/constants'

export const formatUserInfo = (name, avatar, uid) => (
  {
    name,
    avatar,
    uid,
  }
)

export const formatDuck = (text, {name, avatar, uid}) => (
  {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
)

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

const getMilliseconds = (timestamp) => (
  new Date().getTime() - new Date(timestamp).getTime()
)

export const staleDucks = (timestamp) => (
  getMilliseconds(timestamp) > usersDucksExpirationLength
)

export const stableUser = (timestamp) => (
  getMilliseconds(timestamp) > userExpirationLength
)

export const staleReplies = (timestamp) => (
  getMilliseconds(timestamp) > repliesExpirationLength
)

export const formatReply = ({ name, uid, avatar }, reply) => (
  {
    name,
    reply,
    uid,
    timestamp: Date.now(),
    avatar,
  }
)
