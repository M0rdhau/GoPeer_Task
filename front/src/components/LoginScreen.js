import React, { useState } from 'react'
import Register from './Register'
import Login from './Login'


export const LoginScreen = () => {
  const [registering, setRegistering] = useState(false)

  return (
    <div>
      {!registering
        ? <Login toggle={() => setRegistering(!registering)}/>
        : <Register toggle={() => setRegistering(!registering)}/>
      }
    </div>
  )
}