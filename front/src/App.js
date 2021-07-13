import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUser } from './reducers/userReducer'
import { UserScreen } from './components/UserScreen'
import { Stats } from './components/Stats'
import Notification from './components/presentational/Notification'
import { getGeneral } from './reducers/linkDataReducer'

const App = () => {
  const data = useSelector(state => state.linkData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initUser())
    dispatch(getGeneral())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const message = useSelector(state => state.notification.text)
  const error = useSelector(state => state.notification.error)
  const notification = { message, error }

  return (
    <div className="mainBody">
      <Notification notification={notification}/>
      <UserScreen/>
      {user && data.length > 0 && <Stats/>}
    </div>
  )

}

export default App
