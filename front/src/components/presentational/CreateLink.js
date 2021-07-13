import React from 'react'
import Togglable from '../Togglable'

export const Createlink = ({ values, handleChange, handleURLAdd }) => {
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