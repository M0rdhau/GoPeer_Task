import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { Createlink } from '../../components/presentational/CreateLink'

test('<CreateLink> updates parent state', () => {
  const addUrl = jest.fn()
  const handleChange = jest.fn()

  const values = { destURL: '' }

  const component = render(
    <Createlink values={values} handleChange={handleChange} handleURLAdd={addUrl} />
  )

  const input = component.container.querySelector('.addUrl')
  fireEvent.change(input, {
    target: { value: 'Value has been changed' }
  })
  expect(handleChange.mock.calls).toHaveLength(1)
})