const db = {
  ducks: {
    [duckId]: {
      avatar: '',
      duckId: '',
      name: '',
      text: '',
      timestamp: 0,
      uid: '',
    }
  },
  likeCount: {
    [duckId]: 0,
  },
  replies: {
    [duckId]: {
      [replyId]: {
        avatar: '',
        name: '',
        reply: '',
        replyId: '',
        timestamp: 0,
        uid: ''
      }
    }
  },
  users: {
    [uid]: {
      avatar: '',
      name: '',
      uid: '',
    }
  },
  usersDucks: {
    [uid]: {
      [duckId]: {
        avatar: '',
        duckId: '',
        name: '',
        text: '',
        timestamp: 0,
        uid: ''
      }
    }
  },
  usersLikes: {
    [uid]: {
      [duckId]: true
    }
  }
}
