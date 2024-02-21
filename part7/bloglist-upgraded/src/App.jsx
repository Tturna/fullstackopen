import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from './reducers/userDataReducer';
import { setBlogs } from './reducers/blogsReducer';

import blogService from './services/blogs';
import Notification from './components/Notification';
import Login from './components/Login';
import Home from './components/Home';
import UserList from './components/UserList';
import UserInfo from './components/UserInfo';

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

    return (
        <div>
            <h2>blogs</h2>

            <p>Logged in as {userData.username}</p>
            <button onClick={handleLogout}>Logout</button>

            <Notification isError={true} />
            <Notification />

            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/users' element={<UserList />} />
                    <Route path='/users/:id' element={<UserInfo />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
