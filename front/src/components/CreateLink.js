import React from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import linkService from '../services/linkService'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'

export const Createlink = () => {
  const [values, handleChange, reset] = useForm({ destURL: '' })
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleURLAdd = async () => {
    try{
      const response = await linkService.addUrl(user, values.destURL)
      const currentLoc = window.location.href
      dispatch(setNotification(`URL added: ${currentLoc}links/${response.data.id}`, false))
    }catch(e){
      console.log(e)
    }
    reset()
  }

  return (
    <Togglable buttonLabel='Add a URL'>
      <div className='urlCreator' >
        Destination URL:
        <input name='destURL' value={values.destURL} onChange={handleChange} />
        <button onClick={handleURLAdd}>Add</button>
      </div>
    </Togglable>
  )
}