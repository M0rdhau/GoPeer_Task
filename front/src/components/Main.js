import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGeneral, populateLinks } from '../reducers/linkDataReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Createlink } from './CreateLink'
import { Stats } from './Stats'

export const Main = () => {
  const data = useSelector(state => state.linkData)
  const dispatch = useDispatch()

  const populateDB = async () => {
    try{
      await dispatch(populateLinks())
    }catch (e){
      dispatch(setNotification('Unable to populate with dummy data', true))
    }
  }

  useEffect(() => {
    dispatch(getGeneral())
  }, [dispatch])

  return (
    <div>
      <Createlink/>
      <button onClick={populateDB}>Populate</button>
      {data.length > 0 && <Stats/>}
    </div>
  )
}