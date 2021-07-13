import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Notification from '../components/presentational/Notification'

test('Renders notification', () => {
  const notification = {
    message: 'First test of the project',
    error: true
  }

  const component = render(
    <Notification notification={notification} />
  )
  component.debug()

  expect(component.container).toHaveTextContent('First test of the project')
})