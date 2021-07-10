import React from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { createLink } from '../reducers/linkDataReducer'

export const Createlink = () => {
  const [values, handleChange, reset] = useForm({ destURL: '' })
  const dispatch = useDispatch()

  const handleURLAdd = () => {
    try{
      dispatch(createLink(values.destURL))
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