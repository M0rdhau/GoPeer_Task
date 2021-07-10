import React from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { createLink } from '../reducers/linkDataReducer'
import { setNotification } from '../reducers/notificationReducer'

export const Createlink = () => {
  const [values, handleChange, reset] = useForm({ destURL: '' })
  const dispatch = useDispatch()

  const handleURLAdd = async () => {
    try{
      await dispatch(createLink(values.destURL))
    }catch(e){
      dispatch(setNotification('Unable to create a new URL', true))
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