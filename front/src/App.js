import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initUser } from './reducers/userReducer'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  return (
    <div className="mainBody">
      <Login/>
      <Register/>
    </div>
  )

}

export default App
