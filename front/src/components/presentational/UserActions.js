import React from 'react'
import { Createlink } from './CreateLink'

export const UserActions =
({ user, values, handleChange, reset, handleURLAdd, handleLogout, populateDB }) => {
  return(
    <div className="loginForm">
      <p>Hello, {user.username}</p>
      <button onClick={handleLogout} >Log out</button>
      <Createlink
        values={values}
        handleChange={handleChange}
        reset={reset}
        handleURLAdd={handleURLAdd}
      />
      <button onClick={populateDB}>Populate</button>
    </div>
  )
}