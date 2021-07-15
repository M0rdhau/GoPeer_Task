import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { DetailsTable } from '../../components/presentational/DetailsTable'
import { StaticRouter } from 'react-router-dom'

describe('<DetailsTable />', () => {
  let component
  const linkData = [
    {
      id: 'mockID',
      destURL: 'somesite.com'
    }
  ]
  const mockRemove = jest.fn()
  beforeEach(() => {
    component = render(
      <StaticRouter>
        <DetailsTable linkData={linkData} removeLink={mockRemove} />
      </StaticRouter>
    )
  })

  test('Renders correct values', () => {
    expect(component.container).toHaveTextContent('somesite.com')
    expect(component.container).toHaveTextContent('localhost:3001/links/mockID')
  })
  test('Can remove a URL listing', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    expect(mockRemove.mock.calls).toHaveLength(1)
  })
})