import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUser } from './reducers/userReducer'
import { LoginScreen } from './components/LoginScreen'
import { Createlink } from './components/CreateLink'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <div className="mainBody">
      <LoginScreen/>
      {user && <Createlink/>}
    </div>
  )

}

export default App
