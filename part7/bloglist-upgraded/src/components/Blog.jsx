import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    updateBlog as updateBlogAction,
    removeBlog as removeBlogAction,
} from '../reducers/blogsReducer';
import blogService from '../services/blogs';

const Comments = ({ comments }) => {
    console.log(comments);
    if (!comments || comments.length == 0) return null;

    return(
        <div>
            {comments.map(c => (
                <li>{c}</li>
            ))}
        </div>
    );
}

const Blog = () => {
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
                <button className="likeBtn" onClick={handleLike}>
                    Like
                </button>
                <br />
                <p style={blogP}>Added by {blog.creator.username}</p>
                <br />
                {loggedIsOwner && (
                    <button onClick={handleRemove}>Delete</button>
                )}
                <h3>Comments</h3>
                <Comments comments={blog.comments} />
            </div>
        </div>
    );
};

export default Blog;
