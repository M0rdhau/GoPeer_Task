import React from 'react'
import { Createlink } from './CreateLink'
import Notification from './Notification'
import { Stats } from './Stats'

export const Main = () => {
  return (
    <div>
      <Notification/>
      <Createlink/>
      <Stats/>
    </div>
  )
}