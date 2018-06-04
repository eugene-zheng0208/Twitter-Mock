import auth, { logout, saveUser } from './../../helpers/auth'
import { formatUserInfo } from './../../helpers/utils'
import { fetchUser } from './../../helpers/api'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

export const authUser = (uid) => (
  {
    type: AUTH_USER,
    uid,
  }
)

const unauthUser = () => (
  {
    type: UNAUTH_USER,
  }
)

const fetchingUser = () => (
  {
    type: FETCHING_USER,
  }
)

const fetchingUserFailure = (error) => {
  console.warn(error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.',
  }
}

export const fetchingUserSuccess = (uid, user) => (
  {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
  }
)

export const fetchAndHandleAuthedUser = () => (dispatch) => {
  dispatch(fetchingUser())

  auth().then(({ user }) => {
    const userData = user.providerData[0]
    const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
    dispatch(fetchingUserSuccess(user.uid, userInfo))
  })
    .then(({ user }) => saveUser(user))
    .then(user => dispatch(authUser(user.uid)))
    .catch(error => dispatch(fetchingUserFailure(error)))
}

export const logoutAndUnauth = () => (dispatch) => {
  logout()
  dispatch(unauthUser())
}

export const removeFetchingUser = () => (
  {
    type: REMOVE_FETCHING_USER,
  }
)

export const fetchAndHandleUser = (uid) => (dispatch) => {
  dispatch(fetchingUser())

  fetchUser(uid)
    .then(user => dispatch(fetchingUserSuccess(uid, user)))
    .catch(error => dispatch(fetchingUserFailure(error)))
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: Date.now(),
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
  isAuthed: false,
  authedId: '',
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_FETCHING_USER:
      return {
        ...state,
        isFetching: false,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action),
        }

    default :
      return state
  }
}

export default users
