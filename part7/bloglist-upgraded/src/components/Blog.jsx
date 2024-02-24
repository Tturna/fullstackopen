import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateBlog as updateBlogAction,
    removeBlog as removeBlogAction,
} from '../reducers/blogsReducer';
import blogService from '../services/blogs';

import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 5px 15px;
    color: #fff;
    background-color: #FF715B;
    border: none;
    border-radius: 5px;
`

const Comments = ({ comments }) => {
    console.log(comments);
    if (!comments || comments.length == 0) return null;

    return(
        <div>
            {comments.map(c => (
                <li key={c}>{c}</li>
            ))}
        </div>
    );
}

const Blog = () => {
    const [comment, setComment] = useState('');

    const state = useSelector(state => state);
    const loggedUser = state.userData.username;
    const id = useParams().id;
    const blog = state.blogs.find(b => b.id === id);

    if (!blog) return "Blog not found :(";

    const loggedIsOwner = blog.creator.username === loggedUser;
    const dispatch = useDispatch();

    const handleLike = async () => {
        const newBlog = { ...blog };
        newBlog.likes = blog.likes + 1;
        const updated = await blogService.update(newBlog);
        dispatch(updateBlogAction(updated));
    };

    const handleRemove = async () => {
        if (
            window.confirm(
                `Are you sure you want to delete '${blog.title}' by ${blog.author}?`
            )
        ) {
            await blogService.remove(blog.id);
            dispatch(removeBlogAction(blog.id));
        }
    };

    const handleComment = async (event) => {
        event.preventDefault();
        const newBlog = { ...blog };
        if (!newBlog.comments) {
            newBlog.comments = [];
        }

        newBlog.comments = newBlog.comments.concat(comment);
        console.log(newBlog);
        const updated = await blogService.update(newBlog);
        dispatch(updateBlogAction(updated));
    }

    // const blogDiv = {
    //     border: 'solid 2px',
    //     margin: '10px auto',
    //     padding: '5px',
    // };

    const blogP = {
        display: 'inline-block',
        margin: '5px 10px 5px 0',
    };

    const block = { display: 'block' };

    return (
        <div className="blog">
            <p style={blogP}>
                &apos;{blog.title}&apos; by {blog.author}
            </p>
            <div  className="blogDetails">
                <a href={blog.url} style={block}>
                    {blog.url}
                </a>
                <p className="likes" style={blogP}>
                    likes: {blog.likes}
                </p>
                <StyledButton className="likeBtn" onClick={handleLike}>
                    Like
                </StyledButton>
                <br />
                <p style={blogP}>Added by {blog.creator.username}</p>
                <br />
                {loggedIsOwner && (
                    <StyledButton onClick={handleRemove}>Delete</StyledButton>
                )}
                <h3>Comments</h3>
                <form onSubmit={handleComment}>
                    <input
                        type='text'
                        value={comment}
                        placeholder='Your comment...'
                        id='commentInput'
                        onChange={e => setComment(e.target.value)}
                    />
                    <StyledButton>Add comment</StyledButton>
                </form>
                <Comments comments={blog.comments} />
            </div>
        </div>
    );
};

export default Blog;
