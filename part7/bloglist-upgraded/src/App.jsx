import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeNotification } from './reducers/notificationReducer';
import { changeError } from './reducers/errorReducer';
import { setBlogs, addBlog } from './reducers/blogsReducer';
import { setUserData, clearUserData } from './reducers/userDataReducer';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import UserList from './components/UserList';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const blogFromRef = useRef();

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        blogService
            .getAll()
            .then((blogs) =>
                dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
            );
    }, [dispatch]);

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

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const responseData = await loginService.login({
                username,
                password,
            });

            blogService.setToken(responseData.token);
            window.localStorage.setItem(
                'loggeduser',
                JSON.stringify(responseData)
            );
            dispatch(setUserData(responseData));
            setUsername(responseData.username);
            setPassword('');
        } catch (exception) {
            console.log(`Login failed: ${exception}`);
            dispatch(changeError('Wrong username or password'));
            setTimeout(() => {
                dispatch(changeError(''));
            }, 5000);
        }
    };

    const handleLogout = () => {
        dispatch(clearUserData());
        setUsername('');
        setPassword('');
        window.localStorage.removeItem('loggeduser');
    };

    if (userData.token === null) {
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification isError={true} />

                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            id="usernameInput"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            id="passwordInput"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h2>blogs</h2>

            <p>Logged in as {username}</p>
            <button onClick={handleLogout}>Logout</button>

            <Notification isError={true} />
            <Notification />

            <UserList />

            <Togglable buttonLabel="New Blog" ref={blogFromRef}>
                <BlogForm createBlog={createBlog} />
            </Togglable>

            <BlogList />
        </div>
    );
};

export default App;
