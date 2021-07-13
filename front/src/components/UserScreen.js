import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logOut } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { populateLinks, createLink, getGeneral } from '../reducers/linkDataReducer'
import registerService from '../services/register'
import Login from './presentational/Login'
import { UserActions } from './presentational/UserActions'
import Register from './presentational/Register'

export const UserScreen = () => {
  const [registering, setRegistering] = useState(false)
  const [loginValues, handleLoginChange, resetLogin] = useForm({ username: '', password: '' })
  const [addUrlValues, handleUrlChange, resetUrl] = useForm({ destURL: '' })
  const [registerValues, handleRegisterChange, resetRegister] = useForm({ username: '', password: '', confirmPassword: '' })
  const [areEqual, setAreEqual] = useState(true)

  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user){
      dispatch(getGeneral())
    }
  }, [dispatch, user])

  const toggle = () => {
    setRegistering(!registering)
  }

  // login screen code
  const handleLogin = async () => {
    try{
      await dispatch(loginUser(loginValues.username, loginValues.password))
    }catch (e){
      dispatch(setNotification(e.response.headers.error))
    }
    resetLogin()
  }

  //Logged in user panel code
  const handleLogout = () => {
    dispatch(logOut())
  }

  const populateDB = async () => {
    try{
      await dispatch(populateLinks())
    }catch (e){
      dispatch(setNotification('Unable to populate with dummy data', true))
    }
  }

  const handleURLAdd = async () => {
    try{
      await dispatch(createLink(addUrlValues.destURL))
    }catch(e){
      dispatch(setNotification('Unable to create a new URL', true))
    }
    resetUrl()
  }

  //registration code
  const handleRegister = async () => {
    if(areEqual){
      try{
        await registerService.register(registerValues.username, registerValues.password)
        dispatch(setNotification('Registration success!', false))
        resetRegister()
        toggle()
      }catch (e){
        dispatch(setNotification(e.response.headers.error))
      }
    }
  }

  const onConfirmPasswordChange = (event) => {
    setAreEqual(event.target.value === registerValues.password)
    handleRegisterChange(event)
  }

  return (
    <>
      {!registering
        ? (user !== null)
          ? <UserActions
            user={user}
            values={addUrlValues}
            handleChange={handleUrlChange}
            handleURLAdd = {handleURLAdd}
            handleLogout = {handleLogout}
            populateDB = {populateDB}
          />
          : <Login
            toggle={toggle}
            values={loginValues}
            handleChange={handleLoginChange}
            handleLogin={handleLogin}
          />
        : <Register
          toggle={toggle}
          areEqual={areEqual}
          values={registerValues}
          handleChange={handleRegisterChange}
          handleRegister={handleRegister}
          onConfirmPasswordChange={onConfirmPasswordChange}
        />
      }
    </>
  )
}