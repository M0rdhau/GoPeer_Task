import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Login from '../../components/presentational/Login'

describe('<Login />', () => {
  const values = {
    username: 'mockUsername',
    password: ''
  }
  const mockToggle = jest.fn()
  const mockChange = jest.fn()
  const mockLogin = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <Login
        values={values} handleChange={mockChange} toggle={mockToggle} handleLogin={mockLogin}
      />
    )
  })

  test('Buttons are working', () => {
    const toggleButton = component.container.querySelector('.toggleButton')
    const loginButton = component.container.querySelector('.loginButton')
    fireEvent.click(loginButton)
    fireEvent.click(toggleButton)

    expect(mockToggle.mock.calls).toHaveLength(1)
    expect(mockLogin.mock.calls).toHaveLength(1)
  })

  test('Input is also working', () => {
    const usernameField = component.container.querySelector('.userNameInput')
    const passwordField = component.container.querySelector('.passwordInput')

    fireEvent.change(usernameField, {
      target: { value: 'uNameChanged'  }
    })
    fireEvent.change(passwordField, {
      target: { value: 'pWordChanged' }
    })

    expect(mockChange.mock.calls).toHaveLength(2)
  })
})