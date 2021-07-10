import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'


export const LoginScreen = () => {
  const [registering, setRegistering] = useState(false)
  const dispatch = useDispatch()

  const toggle = () => {
    setRegistering(!registering)
    dispatch(setNotification('toggle!', false))
  }

  return (
    <div>
      {!registering
        ? <Login toggle={toggle}/>
        : <Register toggle={toggle}/>
      }
    </div>
  )
}