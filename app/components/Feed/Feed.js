import React from 'react'
import PropTypes from 'prop-types'
import { newDuckContainer, header } from './styles.css'
import { DuckContainer } from '../../containers'
import { errorMsg } from '../../sharedStyles/styles.css'
import { List } from 'immutable'
const { instanceOf, func, string, bool } = PropTypes

const NewDucksAvailable = ({handleClick}) => (
  <div className={newDuckContainer} onClick={handleClick}>
    {'New Ducks Available'}
  </div>
)

NewDucksAvailable.propTypes = {
  handleClick: func.isRequired,
}

const Feed = ({ isFetching, newDucksAvailable, resetNewDucksAvailable, duckIds, error }) => (
  isFetching
    ? <h1 className={header}>{'Fetching'}</h1>
    : (
      <div>
        {newDucksAvailable && <NewDucksAvailable handleClick={resetNewDucksAvailable} />}
        {duckIds.size === 0 && <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no ducks yet 😞'}</p>}
        {duckIds.map((id) => <DuckContainer duckId={id} key={id} />)}
        {error && <p className={errorMsg}>{error}</p>}
      </div>
    )
)

Feed.propTypes = {
  duckIds: instanceOf(List),
  error: string.isRequired,
  isFetching: bool.isRequired,
  newDucksAvailable: bool.isRequired,
  resetNewDucksAvailable: func.isRequired,
}

export default Feed
