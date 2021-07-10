/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGeneral, populateLinks } from '../reducers/linkDataReducer'
import { Createlink } from './CreateLink'
import Notification from './Notification'
import { Stats } from './Stats'

export const Main = () => {
  const data = useSelector(state => state.linkData)
  const dispatch = useDispatch()

  const populateDB = () => {
    dispatch(populateLinks())
  }

  useEffect(() => {
    dispatch(getGeneral())
  }, [dispatch])

  return (
    <div>
      <Notification/>
      <Createlink/>
      <button onClick={populateDB}>Populate</button>
      {data.length > 0 && <Stats/>}
    </div>
  )
}