import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const message = useSelector(state => state.notification.text)
  const error = useSelector(state => state.notification.error)
  if(message === ''){
    return null
  }
  return (
    <div className={error ? 'error' : 'notification'}>
      {message}
    </div>
  )
}


export default Notification
