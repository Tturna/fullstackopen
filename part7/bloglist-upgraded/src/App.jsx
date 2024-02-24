import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from './reducers/userDataReducer';
import { setBlogs } from './reducers/blogsReducer';
import styled from 'styled-components';

import blogService from './services/blogs';
import Notification from './components/Notification';
import Login from './components/Login';
import Home from './components/Home';
import UserList from './components/UserList';
import UserInfo from './components/UserInfo';
import Blog from './components/Blog';

const ContentContainer = styled.div`
    width: 85%;
    height: 100vh;
    padding: 20px;
    margin: auto;
`
const StyledNav = styled.nav`
    width: 100%;
    display: ruby block;
    background-color: #1EA896;
    padding: 10px;
`
const AppTitle = styled.h1`
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`
const StyledButton = styled.button`
    padding: 5px 15px;
    color: #fff;
    background-color: #FF715B;
    border: none;
    border-radius: 5px;
`

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

    return (
        <div>
            <StyledNav>
                <Link style={st} to="/" >Blogs</Link>
                <Link style={st} to="/users" >Users</Link>
                <p style={st}>Logged in as {userData.username}</p>
                <StyledButton style={st} onClick={handleLogout}>Logout</StyledButton>
            </StyledNav>
            <ContentContainer>

                <AppTitle>Blogs</AppTitle>

                <Notification isError={true} />
                <Notification />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/users' element={<UserList />} />
                    <Route path='/users/:id' element={<UserInfo />} />
                    <Route path='/blogs/:id' element={<Blog />} />
                </Routes>
            </ContentContainer>
        </div>
    );
};

export default App;
