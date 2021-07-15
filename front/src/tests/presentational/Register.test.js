import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import Register from '../../components/presentational/Register'
import { expect, test } from '@jest/globals'

describe('<Register />', () => {
  const values = {
    username: 'mockUsername',
    password: ''
  }
  const mockToggle = jest.fn()
  const mockChange = jest.fn()
  const mockRegister = jest.fn()
  const mockCPassChange = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <Register
        toggle={mockToggle}
        areEqual={true}
        values={values}
        handleChange={mockChange}
        handleRegister={mockRegister}
        onConfirmPasswordChange={mockCPassChange}
      />
    )
  })

  test('Buttons are working', () => {
    const toggleButton = component.container.querySelector('.toggleButton')
    const registerButton = component.container.querySelector('.registerButton')
    fireEvent.click(registerButton)
    fireEvent.click(toggleButton)

    expect(mockToggle.mock.calls).toHaveLength(1)
    expect(mockRegister.mock.calls).toHaveLength(1)
  })

  test('Input is also working', () => {
    const usernameField = component.container.querySelector('.userNameInput')
    const passwordField = component.container.querySelector('.passwordInput')
    const confirmPWordField = component.container.querySelector('.confirmPassword')

    fireEvent.change(usernameField, {
      target: { value: 'uNameChanged'  }
    })
    fireEvent.change(passwordField, {
      target: { value: 'pWordChanged' }
    })
    fireEvent.change(confirmPWordField, {
      target: { value: 'pWordChanged' }
    })

    expect(mockChange.mock.calls).toHaveLength(2)
    expect(mockCPassChange.mock.calls).toHaveLength(1)
  })
})

test('If fields aren\'t equal, show message', () => {
  const values = {
    username: 'mockUsername',
    password: ''
  }
  const mockToggle = jest.fn()
  const mockChange = jest.fn()
  const mockRegister = jest.fn()
  const mockCPassChange = jest.fn()
  const component = render(
    <Register
      toggle={mockToggle}
      areEqual={false}
      values={values}
      handleChange={mockChange}
      handleRegister={mockRegister}
      onConfirmPasswordChange={mockCPassChange}
    />
  )
  const warningMsg = component.container.querySelector('p')
  expect(warningMsg).toHaveTextContent('Passwords must match!')
})