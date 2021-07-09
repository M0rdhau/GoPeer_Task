import React from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logOut } from '../reducers/userReducer'

const Login = () => {
  const [values, handleChange, reset] = useForm({ username: '', password: '' })
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const handleLogin = async () => {
    try{
      dispatch(loginUser(values.username, values.password))
    }catch (e){
      console.log(e)
    }
    reset()
  }

  const handleLogout = () => {
    dispatch(logOut())
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
        <button onClick={handleLogin} >Log In</button>
      </div>
    )
  }
}

export default Login
