import React from 'react'

const Notification = ({ notification }) => {
  if(notification.message === ''){
    return null
  }
  return (
    <div className={notification.error ? 'error' : 'notification'}>
      <p>{notification.message}</p>
    </div>
  )
}


export default Notification
