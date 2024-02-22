import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from './reducers/userDataReducer';
import { setBlogs } from './reducers/blogsReducer';

import blogService from './services/blogs';
import Notification from './components/Notification';
import Login from './components/Login';
import Home from './components/Home';
import UserList from './components/UserList';
import UserInfo from './components/UserInfo';
import Blog from './components/Blog';

const App = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);

    useEffect(() => {
        blogService
            .getAll()
            .then((blogs) =>
                dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
            );
    }, [dispatch]);

    if (userData.token === null) {
        return (<Login />);
    }

    const handleLogout = () => {
        dispatch(clearUserData());
        window.localStorage.removeItem('loggeduser');
    };

    const st = {
        margin: "0 5px"
    }

    const navSt = {
        display: "block ruby",
        "background-color": "#dddddd"
    }

    return (
        <div>
            <nav style={navSt}>
                <Link style={st} to="/" >Blogs</Link>
                <Link style={st} to="/users" >Users</Link>
                <p style={st}>Logged in as {userData.username}</p>
                <button style={st} onClick={handleLogout}>Logout</button>
            </nav>

            <h2>blogs</h2>

            <Notification isError={true} />
            <Notification />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/users' element={<UserList />} />
                <Route path='/users/:id' element={<UserInfo />} />
                <Route path='/blogs/:id' element={<Blog />} />
            </Routes>
        </div>
    );
};

export default App;
