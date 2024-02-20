import { useSelector, useDispatch } from 'react-redux';
import {
    updateBlog as updateBlogAction,
    removeBlog as removeBlogAction,
} from '../reducers/blogsReducer';
import blogService from '../services/blogs';
import Blog from './Blog';

const BlogList = () => {
    const dispatch = useDispatch();

    const updateBlog = async (newBlog) => {
        const updated = await blogService.update(newBlog);
        dispatch(updateBlogAction(updated));
    };

    const removeBlog = async (id) => {
        await blogService.remove(id);
        dispatch(removeBlogAction(id));
    };

    const blogs = useSelector((state) => state.blogs);
    const blogComponents = blogs.map((blog) => (
        <Blog key={blog.id} {...{ blog, updateBlog, removeBlog }} />
    ));

    return <div>{blogComponents}</div>;
};

export default BlogList;
