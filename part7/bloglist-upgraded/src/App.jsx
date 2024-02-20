import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeNotification } from './reducers/notificationReducer';
import { changeError } from './reducers/errorReducer';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const blogFromRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        blogService
            .getAll()
            .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    }, []);

    const createBlog = async (newBlog) => {
        const returnedBlog = await blogService.create(newBlog);
        blogFromRef.current.toggleVisibility();
        setBlogs(blogs.concat(returnedBlog));

        dispatch(
            changeNotification(
                `Added blog '${returnedBlog.title}' by ${returnedBlog.author}`
            )
        );

        setTimeout(() => {
            dispatch(changeNotification(''));
        }, 5000);
    };

    const updateBlog = async (newBlog) => {
        const updated = await blogService.update(newBlog);
        setBlogs(
            blogs
                .map((b) => (b.id === updated.id ? updated : b))
                .sort((a, b) => b.likes - a.likes)
        );
    };

    const removeBlog = async (id) => {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
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
            setUserData(responseData);
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
        setUserData(null);
        setUsername('');
        setPassword('');
        window.localStorage.removeItem('loggeduser');
    };

    if (userData === null) {
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

            <Togglable buttonLabel="New Blog" ref={blogFromRef}>
                <BlogForm createBlog={createBlog} />
            </Togglable>

            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    {...{ blog, updateBlog, removeBlog, loggedUser: username }}
                />
            ))}
        </div>
    );
};

export default App;
