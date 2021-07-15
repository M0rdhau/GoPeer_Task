import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Notification from '../../components/presentational/Notification'

test('Renders an error', () => {
  const notification = {
    message: 'First test of the project',
    error: true
  }

  const component = render(
    <Notification notification={notification} />
  )

  expect(component.container).toHaveTextContent('First test of the project')
  const div = component.container.querySelector('div')
  expect(div).toHaveClass('error')
})

test('Renders a message', () => {
  const notification = {
    message: 'Second test of the project',
    error: false
  }

  const component = render(
    <Notification notification={notification} />
  )

  expect(component.container).toHaveTextContent('Second test of the project')
  const div = component.container.querySelector('div')
  expect(div).toHaveClass('notification')
  // console.log(prettyDOM(div))
})

test('Does not render anything', () => {
  const notification = {
    message: ''
  }

  const component = render(
    <Notification notification={notification} />
  )

  expect(component.container[0]).not.toBeDefined()
})