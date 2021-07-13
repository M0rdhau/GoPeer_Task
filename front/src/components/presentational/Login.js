import React from 'react'

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

export default Login
