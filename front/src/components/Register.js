import React from 'react'
import { useForm } from '../hooks/useForm'
import register from '../services/register'

const Register = () => {
  const [values, handleChange, reset] = useForm({ username: '', password: '', confirmPassword: '' })

  const handleRegister = async () => {
    try{
      const registerSuccess = await register(values.username, values.password)
    }catch (e){
      console.log(e)
    }
    reset()
  }

  if(user !== null){
    return(
      <div>
        <p>Hello, {user.username}</p>
        <button onClick={handleLogout} >Log out</button>
      </div>
    )
  }else{
    return(
      <div className="loginForm">
        Username: <input name='username' value={values.username} onChange={handleChange} />
        Password: <input
          name='password'
          type='password'
          value={values.password}
          onChange={handleChange} />
        <button onClick={handleRegister} >Log In</button>
      </div>
    )
  }
}

export default Register
