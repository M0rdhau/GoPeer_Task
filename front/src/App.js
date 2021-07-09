import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initUser } from './reducers/userReducer'
import { LoginScreen } from './components/LoginScreen'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  return (
    <div className="mainBody">
      <LoginScreen/>
    </div>
  )

}

export default App
