/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUser } from './reducers/userReducer'
import { LoginScreen } from './components/LoginScreen'
import { Main } from './components/Main'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <div className="mainBody">
      <LoginScreen/>
      {user && <Main/>}
    </div>
  )

}

export default App
