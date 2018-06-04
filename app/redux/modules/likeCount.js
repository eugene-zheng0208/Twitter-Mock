import { fetchLikeCount } from '../../helpers/api'
import { ADD_LIKE, REMOVE_LIKE } from './usersLikes'
const FETCHING_COUNT = 'FETCHING_COUNT'
const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR'
const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS'

const fetchingCount = () => (
  {
    type: FETCHING_COUNT,
  }
)

const fetchingCountError = (error) => {
  console.warn(error)
  return {
    type: FETCHING_COUNT_ERROR,
    error: 'Error fetching duck\'s like count',
  }
}

const fetchingCountSuccess = (duckId, count) => (
  {
    type: FETCHING_COUNT_SUCCESS,
    duckId,
    count,
  }
)

export const initLikeFetch = (duckId) => (dispatch) => {
  dispatch(fetchingCount())

  fetchLikeCount(duckId)
    .then(count => dispatch(fetchingCountSuccess(duckId, count)))
    .catch(error => dispatch(fetchingCountError(error)))
}

const count = (state = 0, action) => {
  switch (action.type) {
    case ADD_LIKE :
      return state + 1
    case REMOVE_LIKE :
      return state - 1
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

const likeCount = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_COUNT :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_COUNT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_COUNT_SUCCESS :
      return {
        ...state,
        ...initialState,
        [action.duckId]: action.count,
      }
    case ADD_LIKE :
    case REMOVE_LIKE :
      return typeof state[action.duckId] === 'undefined'
        ? state
        : {
          ...state,
          [action.duckId]: count(state[action.duckId], action),
        }
    default :
      return state
  }
}

export default likeCount
