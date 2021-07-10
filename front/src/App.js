import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUser } from './reducers/userReducer'
import { LoginScreen } from './components/LoginScreen'
import { Stats } from './components/Stats'
import Notification from './components/Notification'
import { getGeneral } from './reducers/linkDataReducer'

const App = () => {
  const data = useSelector(state => state.linkData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUser())
    dispatch(getGeneral())
  }, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <div className="mainBody">
      <Notification/>
      <LoginScreen/>
      {user && data.length > 0 && <Stats/>}
    </div>
  )

}

export default App
