import React from 'react'
import { Createlink } from './CreateLink'
import PropTypes from 'prop-types'

export const UserActions =
({ user, values, handleChange, handleURLAdd, handleLogout, populateDB }) => {
  return(
    <div className="loginForm">
      <p>Hello, {user.username}</p>
      <button onClick={handleLogout} >Log out</button>
      <Createlink
        values={values}
        handleChange={handleChange}
        handleURLAdd={handleURLAdd}
      />
      <button onClick={populateDB}>Populate</button>
    </div>
  )
}

UserActions.propTypes = {
  user: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleURLAdd: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  populateDB: PropTypes.func.isRequired
}