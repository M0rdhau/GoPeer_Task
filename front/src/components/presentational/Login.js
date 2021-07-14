import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ toggle, values, handleChange, handleLogin }) => {
  return(
    <div className="loginForm">
      <label htmlFor='username'>Username: </label>
      <input name='username' value={values.username} onChange={handleChange} />
      <label htmlFor='password'>Password: </label>
      <input
        name='password'
        type='password'
        value={values.password}
        onChange={handleChange} />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={toggle}>Or Register</button>
    </div>
  )
}

Login.propTypes = {
  toggle: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default Login
