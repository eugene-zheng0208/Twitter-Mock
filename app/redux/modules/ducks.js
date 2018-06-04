import { saveDuck, fetchDuck } from '../../helpers/api'
import { closeModal } from './modal'
import { addSingleUsersDuck } from './usersDucks'
import { Map } from 'immutable'

const FETCHING_DUCK = 'FETCHING_DUCK'
const FETCHING_DUCK_ERROR = 'FETCHING_DUCK_ERROR'
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS'
const ADD_DUCK = 'ADD_DUCK'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

const fetchingDuck = () => (
  {
    type: FETCHING_DUCK,
  }
)

const fetchingDuckError = (error) => {
  console.warn(error)
  return {
    type: FETCHING_DUCK_ERROR,
    error: 'Error fetching Duck',
  }
}

const fetchingDuckSuccess = (duck) => (
  {
    type: FETCHING_DUCK_SUCCESS,
    duck,
  }
)

export const removeFetching = () => (
  {
    type: REMOVE_FETCHING,
  }
)

const addDuck = (duck) => (
  {
    type: ADD_DUCK,
    duck,
  }
)

export const addMultipleDucks = (ducks) => (
  {
    type: ADD_MULTIPLE_DUCKS,
    ducks,
  }
)

export const duckFanout = (duck) => (dispatch, getState) => {
  const uid = getState().users.authedId
  saveDuck(duck)
    .then((duckWithId) => {
      dispatch(addDuck(duckWithId))
      dispatch(closeModal())
      dispatch(addSingleUsersDuck(uid, duckWithId.duckId))
    })
    .catch(err => {
      console.warn('Error in duckFanout', err)
    })
}

export const fetchAndHandleDuck = (duckId) => (dispatch) => {
  dispatch(fetchingDuck())

  fetchDuck(duckId)
    .then(duck => dispatch(fetchingDuckSuccess(duck)))
    .catch(error => dispatch(fetchingDuckError(error)))
}

const initialState = Map({
  isFetching: true,
  error: '',
})

const ducks = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DUCK :
      return state.merge({
        isFetching: true,
      })
    case ADD_DUCK :
    case FETCHING_DUCK_SUCCESS :
      return state.merge({
        error: '',
        isFetching: false,
        [action.duck.duckId]: action.duck,
      })
    case FETCHING_DUCK_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })
    case REMOVE_FETCHING :
      return state.merge({
        error: '',
        isFetching: false,
      })
    case ADD_MULTIPLE_DUCKS :
      return state.merge(action.ducks)
    default :
      return state
  }
}

export default ducks
