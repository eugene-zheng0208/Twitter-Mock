import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ModalContainer } from '../../containers'
import { container, navContainer, link } from './styles.css'
const { bool } = PropTypes

const NavLinks = ({ isAuthed }) => (
  isAuthed === true
    ? (
      <ul>
        <li><Link to='/' className={link}>Home</Link></li>
      </ul>
    )
    : null
)

const ActionLinks = ({ isAuthed }) => (
  isAuthed === true
    ? (
      <ul>
        <li><ModalContainer /></li>
        <li><Link to='/logout' className={link}>Logout</Link></li>
      </ul>
    )
    : (
      <ul>
        <li><Link to='/' className={link}>Home</Link></li>
        <li><Link to='/auth' className={link}>Authenticate</Link></li>
      </ul>
    )
)

const Navigation = ({ isAuthed }) => (
  <div className={container}>
    <nav className={navContainer}>
      <NavLinks isAuthed={isAuthed} />
      <ActionLinks isAuthed={isAuthed} />
    </nav>
  </div>
)

Navigation.propTypes = NavLinks.propTypes = ActionLinks.propTypes = {
  isAuthed: bool.isRequired,
}

export default Navigation
