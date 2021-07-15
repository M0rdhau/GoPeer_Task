import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { UserActions } from '../../components/presentational/UserActions'

test('Useractions Logout and populate buttons work', () => {
  const mockLogout = jest.fn()
  const mockPopulate = jest.fn()

  const user = { username: 'mockName' }

  const component = render(
    <UserActions user={user} handleLogout={mockLogout} populateDB={mockPopulate} />
  )

  const logoutButton = component.container.querySelector('.logoutButton')
  const populateButton = component.container.querySelector('.populateButton')

  fireEvent.click(logoutButton)
  fireEvent.click(populateButton)

  expect(mockLogout.mock.calls).toHaveLength(1)
  expect(mockPopulate.mock.calls).toHaveLength(1)
})