import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, removeBlog }) => {
    const [detailVisible, setDetailVisible] = useState(false);
    const showWhenOpen = { display: detailVisible ? '' : 'none' };
    const loggedUser = useSelector((state) => state.userData).username;
    const loggedIsOwner = blog.creator.username === loggedUser;
    console.log(
        `Comparing blog owner ${blog.creator.username} to logged ${loggedUser}`
    );

    const toggleDetail = () => setDetailVisible(!detailVisible);

    const handleLike = () => {
        const newBlog = { ...blog };
        newBlog.likes = blog.likes + 1;
        updateBlog(newBlog);
    };

    const handleRemove = () => {
        if (
            window.confirm(
                `Are you sure you want to delete '${blog.title}' by ${blog.author}?`
            )
        ) {
            removeBlog(blog.id);
        }
    };

    const blogDiv = {
        border: 'solid 2px',
        margin: '10px auto',
        padding: '5px',
    };

    const blogP = {
        display: 'inline-block',
        margin: '5px 10px 5px 0',
    };

    const block = { display: 'block' };

    return (
        <div style={blogDiv} className="blog">
            <p style={blogP}>
                &apos;{blog.title}&apos; by {blog.author}
            </p>
            <div style={showWhenOpen} className="blogDetails">
                <a href={blog.url} style={block}>
                    {blog.url}
                </a>
                <p className="likes" style={blogP}>
                    likes: {blog.likes}
                </p>
                <button className="likeBtn" onClick={handleLike}>
                    Like
                </button>
                <br />
                <p style={blogP}>Added by {blog.creator.username}</p>
                <br />
                {loggedIsOwner && (
                    <button onClick={handleRemove}>Delete</button>
                )}
            </div>
            <button onClick={toggleDetail}>
                {detailVisible ? 'Hide' : 'View'}
            </button>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
};

export default Blog;
