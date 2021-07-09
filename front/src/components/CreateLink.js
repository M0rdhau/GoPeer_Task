import React from 'react'
import { useForm } from '../hooks/useForm'
import { useSelector } from 'react-redux'
import linkService from '../services/linkService'
import Togglable from './Togglable'

export const Createlink = () => {
  const [values, handleChange, reset] = useForm({ destURL: '' })
  // const [createdURL, editCreatedURL] = useState('')
  const user = useSelector(state => state.user)

  const handleURLAdd = async () => {
    try{
      const response = await linkService.addUrl(user, values.destURL)
      console.log(response)
      // editCreatedURL(`http://`)
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