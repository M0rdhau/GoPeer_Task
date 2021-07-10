import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'

export const LoginScreen = () => {
  const [registering, setRegistering] = useState(false)

  const toggle = () => {
    setRegistering(!registering)
  }

  return (
    <>
      {!registering
        ? <Login toggle={toggle}/>
        : <Register toggle={toggle}/>
      }
    </>
  )
}