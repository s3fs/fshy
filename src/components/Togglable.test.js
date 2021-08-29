import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel='show'>
        <div className='testDiv' />
      </Togglable>
    )
  })

  test('renders children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined()
  })

  test('@init children not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('buttclick -> children displayed', () => {
    const button = component.container.querySelector('button') //else component.getByText('BUTTON_TEXT') !!queryselector returns the first matchig element
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('content can b hidden', () => {
    //tests here render from scratch (beforeEach)! have to show el first
    const showButton = component.container.querySelector('button')
    fireEvent.click(showButton)

    const closeButton = component.getByText('Cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})