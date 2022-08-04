import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('renders content', async() => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ishaan Test',
    user: {
      username: 'ishaand2',
      id: '62dea1af70a6a577057a3f6a'
    },
    url: 'test.com',
    likes: 3,
  }


  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  const user = userEvent.setup()

  const buttonShow = screen.getByText('view')
  await user.click(buttonShow)
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Ishaan Test')
  expect(div).toHaveTextContent('test.com')
  expect(div).toHaveTextContent(3)

  const buttonHide = screen.getByText('hide')
  await user.click(buttonHide)
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Ishaan Test')
  expect(div).not.toHaveTextContent('test.com')
  expect(div).not.toHaveTextContent(3)


})
