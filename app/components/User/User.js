import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer } from '../../containers'
import { userContainer, header } from './styles.css'
import { errorMsg } from '../../sharedStyles/styles.css'
const { bool, string, array } = PropTypes

const User = ({ noUser, isFetching, name, error, duckIds }) => {
  return noUser
    ? <p className={header}>This user doesnt exist. 👽</p>
    : (
      <div>
        {
          isFetching
            ? <p className={header}>Loading</p>
            : (
              <div>
                <div className={userContainer}>
                  <div>{name}</div>
                </div>
                {
                  duckIds.map(id => (
                    <DuckContainer
                      key={id}
                      duckId={id}/>
                  ))
                }
                {
                  duckIds.length === 0 && (
                    <p className={header}>
                      {`It looks like ${name.split(' ')[0]} hasn't made any ducks yet.`}
                    </p>
                  )
                }
              </div>
            )
        }
        {error && <p className={errorMsg}>{error}</p>}
      </div>
    )
}

User.propTypes = {
  noUser: bool.isRequired,
  name: string.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
  duckIds: array.isRequired,
}

export default User
