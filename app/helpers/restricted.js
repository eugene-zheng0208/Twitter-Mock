import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { checkIfAuthed } from './auth'
const { object } = PropTypes

export default (BaseComponent, store) => {
  class Restricted extends Component {
    componentWillMount () {
      this.checkAuthentication(this.props)
    }

    componentWillReceiveProps (nextProps) {
      if (this.props.location !== nextProps.location) {
        this.checkAuthentication(nextProps)
      }
    }

    checkAuthentication = ({ history }) => {
      if (store.getState().users.isFetching) {
        return
      }

      const nextPathName = history.location.pathname
      const isAuthed = checkIfAuthed(store)
      if (nextPathName === '/' || nextPathName === '/auth') {
        if (isAuthed === true) {
          history.replace('/feed')
        }
      } else {
        if (isAuthed !== true) {
          history.replace('/auth')
        }
      }
    }

    render () {
      return <BaseComponent {...this.props} />
    }
  }

  Restricted.propTypes = {
    location: object.isRequired,
    history: object.isRequired,
  }

  return withRouter(Restricted)
}
