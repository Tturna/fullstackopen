import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Renders title and author but no URL or likes', () => {
    const blog = {
        title: 'Test Blog',
        author: 'me',
        url: 'https://www.example.com',
        likes: 10,
        creator: 'dude'
    }

    const mockUser = 'funiuser'
    const mockUpdater = jest.fn()
    const mockRemover = jest.fn()

    const { container } = render(
        <Blog
            blog={blog}
            updateBlog={mockUpdater}
            removeBlog={mockRemover}
            loggedUser={mockUser}
        />
    )

    // We assume url and likes are children of blogDetails :)
    screen.getByText('\'Test Blog\' by me')
    const blogDetails = container.querySelector('.blogDetails')
    expect(blogDetails).toHaveStyle('display: none')
})