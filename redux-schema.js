const store = {
  users: {
    isFetching: true,
    error: '',
    isAuthed: true,
    authedId: '',
    [uid]: {
      lastUpdated: 0,
      info: {
        name: '',
        avatar: '',
        uid: '',
      }
    }
  },
  modal: {
    isOpen: true,
    duckText: '',
  },
  ducks: {
    isFetching: true,
    error: '',
    [duckId]: {
      avatar: '',
      duckId: '',
      name: '',
      text: '',
      timestamp: 0,
      uid: '',
    }
  },
  usersDucks: {
    isFetching: true,
    error: '',
    [uid]: {
      lastUpdated: 0,
      duckIds: [],
    }
  },
  feed: {
    newDucksAvailable: true,
    newDucksToAdd: [],
    isFetching: true,
    error: '',
    duckIds: [],
  },
  listeners: {
    [listenerId]: true,
  },
  usersLikes: {
    isFetching: true,
    error: '',
    [duckId]: true,
  },
  likeCount: {
    isFetching: true,
    error: '',
    [duckId]: 0,
  },
  replies: {
    isFetching: true,
    error: '',
    [duckId]: {
      lastUpdated: 0,
      replies: {
        [replyId]: {
          avatar: '',
          name: '',
          reply: '',
          replyId: '',
          timestamp: 0,
          uid: '',
        }
      }
    }
  }
}
