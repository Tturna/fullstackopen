import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 5px 15px;
    color: #fff;
    background-color: #FF715B;
    border: none;
    border-radius: 5px;
`

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const userData = useSelector(state => state.userData);

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            creator: userData.username
        }

        createBlog(newBlog)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <h3>New Blog</h3>
            <form onSubmit={addBlog}>
                <div>
                    Title
                    <input
                        type='text'
                        value={newTitle}
                        placeholder='Title'
                        id='titleInput'
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </div>
                <div>
                    Author
                    <input
                        type='text'
                        value={newAuthor}
                        placeholder='Author'
                        id='authorInput'
                        onChange={(e) => setNewAuthor(e.target.value)}
                    />
                </div>
                <div>
                    Url
                    <input
                        type='text'
                        value={newUrl}
                        placeholder='Link'
                        id='urlInput'
                        onChange={(e) => setNewUrl(e.target.value)}
                    />
                </div>
                <StyledButton type='submit'>Create</StyledButton>
            </form>
        </div>
    )
}

export default BlogForm