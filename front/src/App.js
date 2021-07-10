import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUser } from './reducers/userReducer'
import { LoginScreen } from './components/LoginScreen'
import { Main } from './components/Main'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <div className="mainBody">
      <Notification/>
      <LoginScreen/>
      {user && <Main/>}
    </div>
  )

}

export default App
