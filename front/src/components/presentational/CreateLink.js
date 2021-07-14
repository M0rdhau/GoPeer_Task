import React from 'react'
import Togglable from '../Togglable'
import PropTypes from 'prop-types'

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

Createlink.propTypes = {
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleURLAdd: PropTypes.func.isRequired
}
