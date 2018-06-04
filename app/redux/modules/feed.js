import { addListener } from '../../redux/modules/listeners'
import { listenToFeed } from '../../helpers/api'
import { addMultipleDucks } from '../../redux/modules/ducks'
import { fromJS } from 'immutable'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

const settingFeedListener = () => (
  {
    type: SETTING_FEED_LISTENER,
  }
)

const settingFeedListenerError = (error) => {
  console.warn(error)
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.',
  }
}

const settingFeedListenerSuccess = (duckIds) => (
  {
    type: SETTING_FEED_LISTENER_SUCCESS,
    duckIds,
  }
)

const addNewDuckIdToFeed = (duckId) => (
  {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId,
  }
)

export const resetNewDucksAvailable = () => (
  {
    type: RESET_NEW_DUCKS_AVAILABLE,
  }
)

export const setAndHandleFeedListener = () => (dispatch, getState) => {
  let initialFetch = true
  if (getState().listeners.feed === true) {
    return
  }
  dispatch(addListener('feed'))
  dispatch(settingFeedListener())

  listenToFeed(({ feed, sortedIds }) => {
    dispatch(addMultipleDucks(feed))
    initialFetch === true
      ? dispatch(settingFeedListenerSuccess(sortedIds))
      : dispatch(addNewDuckIdToFeed(sortedIds[0]))
    initialFetch = false
  }, error => dispatch(settingFeedListenerError(error)))
}

const initialState = fromJS({
  newDucksAvailable: false,
  newDucksToAdd: [],
  isFetching: false,
  error: '',
  duckIds: [],
})

const feed = (state = initialState, action) => {
  switch (action.type) {
    case SETTING_FEED_LISTENER :
      return state.merge({
        isFetching: true,
      })
    case SETTING_FEED_LISTENER_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case SETTING_FEED_LISTENER_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      })
    case ADD_NEW_DUCK_ID_TO_FEED :
      return state.merge({
        newDucksToAdd: state.get('newDucksToAdd').unshift(action.duckId),
        newDucksAvailable: true,
      })
    case RESET_NEW_DUCKS_AVAILABLE :
      return state.merge({
        duckIds: state.get('newDucksToAdd').concat(state.get('duckIds')),
        newDucksToAdd: [],
        newDucksAvailable: false,
      })
    default :
      return state
  }
}

export default feed
