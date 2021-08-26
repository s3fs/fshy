import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('render content' , () => {
  const note = {
    content: 'Comp-t testing is done w/ react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )
  
  component.debug() //prints whole component to console

  const li = component.container.querySelector('li')
  console.log(prettyDOM(li)) //prints component partition

  //meth 1
  expect(component.container).toHaveTextContent(
    'Comp-t testing is done w/ react-testing-library'
  )

  //meth 2
  const el = component.getByText(
    'Comp-t testing is done w/ react-testing-library'
  )
  expect(el).toBeDefined()

  //meth 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Comp-t testing is done w/ react-testing-library'
  )
})

test('button click event call 1nce', () => {
  const note = {
    content: 'Comp-t testing is done w/ react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const butt = component.getByText('make not important')
  fireEvent.click(butt)

  expect(mockHandler.mock.calls).toHaveLength(1)
})