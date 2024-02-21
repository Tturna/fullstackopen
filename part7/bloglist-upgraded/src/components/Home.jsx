import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNotification } from '../reducers/notificationReducer';
import { addBlog } from '../reducers/blogsReducer';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const blogFromRef = useRef();

    const createBlog = async (newBlog) => {
        const returnedBlog = await blogService.create(newBlog);
        blogFromRef.current.toggleVisibility();
        dispatch(addBlog(returnedBlog));

        dispatch(
            changeNotification(
                `Added blog '${returnedBlog.title}' by ${returnedBlog.author}`
            )
        );

        setTimeout(() => {
            dispatch(changeNotification(''));
        }, 5000);
    };

    return (
        <div>
            <Togglable buttonLabel="New Blog" ref={blogFromRef}>
                <BlogForm createBlog={createBlog} />
            </Togglable>

            <BlogList />
        </div>
    );
}

export default Home;